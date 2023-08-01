//
//  NetworkManager.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/06.
//

import Foundation
import UIKit.UIImage

class NetworkManager: NetworkManageable, URLRequestable, URLRequestProducible, URLComponentsProducible {
    static let shared = NetworkManager()
    private let dataDecoder: DataDecodable = DataDecoder()
    private let baseUrlString = Bundle.main.infoDictionary?["baseUrl"] as? String ?? ""
    private let basePath = "/api"
    private let loginManagerDelegate: LoginManageable
    var jwt: JWT?
    
    init(loginManagerDelegate: LoginManageable) {
        self.loginManagerDelegate = loginManagerDelegate
    }
    
    convenience init() {
        self.init(loginManagerDelegate: LoginManager())
    }
    
    func fetchProducts(query: [String: String]) async -> [Product] {
        do {
            guard let jwt = self.jwt else { throw NetworkingError.jwtIsNil }
            let urlComponents = try self.makeUrlComponents(baseUrl: baseUrlString, path: "/api/products", query: [:])
            let urlRequest = try self.makeUrlRequest(urlComponents, header: [
                "Authorization": "Bearer\(jwt.accessToken)",
                "Content-Type": "application/json",
            ], body: [:], httpMethod: .get)
            let data = try await fetchData(with: urlRequest)
            let productsForm = try dataDecoder.decodeJSON(data, DTO: Form.self)
            let products: [Product] = productsForm.data.products
            return products
        } catch {
            print("error : \(error)")
            return []
        }
    }
    
    func loadImage(from urlString: String, completion: @escaping (UIImage?) -> Void) {
        do {
            let urlComponents = try self.makeUrlComponents(baseUrl: urlString, path: "", query: [:])
            let urlRequest = try self.makeUrlRequest(urlComponents, header: [:], body: [:], httpMethod: .get)
            URLSession.shared.downloadTask(with: urlRequest) { (location, _, error) in
                if let error = error {
                    print("Error downloading image: \(error)")
                    completion(nil)
                    return
                }
                
                guard let location = location else {
                    print("Location is nil.")
                    completion(nil)
                    return
                }
                
                do {
                    let imageData = try Data(contentsOf: location)
                    let image = UIImage(data: imageData)
                    completion(image)
                } catch {
                    print("Error creating image from data: \(error)")
                    completion(nil)
                }
            }.resume()
        } catch {
            print("error : \(error)")
        }
    }
}

// GitHub OAuth
/*
 1. 'GitHub로 로그인' 버튼 터치
     - Safari로 GitHub Authorize 화면으로 이동
 2. Safari에서 GitHub 로그인 및 Authorize 버튼 터치
     - 앱으로 리다이렉트하는 창 팝업
 3. 앱으로 리다이렉트하는 확인 버튼 터치
     - 앱으로 리다이렉트
     - 인증코드를 서버에 전달
     - 이메일을 입력하는 화면을 팝업
 4. 이메일을 입력하고 완료 버튼 터치
     - 이메일을 서버에 전달
 */
extension NetworkManager {
    func presentGithubOAuthLoginScreen() {
        self.loginManagerDelegate.presentGithubOAuthLoginScreen()
    }
    
    func getQueryItemValue(urlString: String, key: String) throws -> String {
        let url = URLComponents(string: urlString)
        let value = url?.queryItems?.first(where: { $0.name == key })?.value
        
        guard let value = value else { throw NetworkingError.failedToGetQueryItemValue }
        return value
    }
    
    func sendAuthorizationCode(_ code: String) async throws -> GitHubOAuthResponseDTO {
        try await self.loginManagerDelegate.sendAuthorizationCode(code)
    }
    
    /// GitHub OAuth 인증코드를 전달한 뒤, 이메일을 보내는 작업을 수행하는 메소드
    func sendEmail(_ email: String, jwtAccessToken: String) async throws -> (UserInfo, JWT) {
        try await self.loginManagerDelegate.sendEmail(email, jwtAccessToken: jwtAccessToken)
    }
    
    func fetchProfileInfo() async throws -> UserInfo {
        guard let jwt = self.jwt else { throw NetworkingError.jwtIsNil }
        let urlComponents = try self.makeUrlComponents(
            baseUrl: self.baseUrlString,
            path: "/api/members",
            query: [:])
        let urlRequest = try self.makeUrlRequest(
            urlComponents,
            header: [
                "Authorization": "Bearer\(jwt.refreshToken)",
                "Content-Type": "application/json",
            ],
            body: [:],
            httpMethod: .get)
        let userInfoData = try await self.fetchData(with: urlRequest)
        let dto =
        try dataDecoder.decodeJSON(userInfoData, DTO: UserInfoDto.self)
        let userName = dto.data.name
        let profileImageUrlString = dto.data.imgUrl
        return UserInfo(name: userName, profileImageUrlString: profileImageUrlString)
    }
}

protocol NetworkManageable {
    var jwt: JWT? { get set }
    func fetchProducts(query: [String: String]) async -> [Product]
    func presentGithubOAuthLoginScreen()
    func sendEmail(_ email: String, jwtAccessToken: String) async throws -> (UserInfo, JWT)
    func fetchProfileInfo() async throws -> UserInfo
}

enum NetworkingError: Error {
    case failedToGetQueryItemValue
    case failedToSendAuthorizationCode
    case failedToSendEmail
    case jwtIsNil
}
