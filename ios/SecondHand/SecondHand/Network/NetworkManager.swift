//
//  NetworkManager.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/06.
//

import Foundation
import UIKit.UIImage

class NetworkManager: NetworkManageable, URLRequestProducible, URLComponentsProducible {
    static let shared = NetworkManager()
    private let dataDecoder: DataDecodable = DataDecoder()
    private let baseUrlString = Bundle.main.infoDictionary?["baseUrl"] as? String ?? ""
    private let basePath = "/api"
    private let clientId = Bundle.main.infoDictionary?["githubClientId"] as? String ?? ""
    private let githubBaseUrl = "https://github.com"
    private lazy var githubOAuthParameters = ["client_id": self.clientId, "scope": "user public_repo"]
    var jwt: JWT?
    
    func fetchProducts(query: [String: String]) async -> [Product] {
        do {
            let urlComponents = try self.makeUrlComponents(baseUrl: baseUrlString, path: self.basePath, query: [:])
            let urlRequest = try self.makeUrlRequest(urlComponents, header: [:], body: [:], httpMethod: .get)
            let data = try await fetchData(with: urlRequest)
            let productsForm = try dataDecoder.decodeJSON(data, DTO: Form.self)
            let products: [Product] = productsForm.data
            return products
        } catch {
            print("error : \(error)")
            return []
        }
    }
    
    private func fetchData(with urlRequest: URLRequest) async throws -> Data {
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        guard let httpResponse = response as? HTTPURLResponse else {
            throw URLError(.badServerResponse)
        }
        
        let status = httpResponse.statusCode
        if status >= 200 && status < 300 {
            return data
        } else {
            throw NSError(domain: "com.SecondHand.fetchDataError", code: status, userInfo: nil)
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
        let path = "/login/oauth/authorize"
        
        do {
            let urlComponents = try self.makeUrlComponents(baseUrl: self.githubBaseUrl, path: path, query: self.githubOAuthParameters)
            if let url = urlComponents.url {
                UIApplication.shared.open(url)
            }
        } catch {
            print("error : \(error)")
        }
    }
    
    func getQueryItemValue(urlString: String, key: String) throws -> String {
        let url = URLComponents(string: urlString)
        let value = url?.queryItems?.first(where: { $0.name == key })?.value
        
        guard let value = value else { throw NetworkingError.failedToGetQueryItemValue }
        return value
    }
    
    func sendAuthorizationCode(_ code: String) async throws -> GitHubOAuthResponseDTO {
        let body = ["authorizationCode": "\(code)"]
        let header = ["Content-Type": "application/json"]
        
        do {
            let urlComponents = try self.makeUrlComponents(baseUrl: self.baseUrlString, path: "/api/auth/github/login", query: [:])
            let urlRequest = try self.makeUrlRequest(urlComponents, header: header, body: body, httpMethod: .post)
            let data = try await self.fetchData(with: urlRequest)
            let reponseData = try self.dataDecoder.decodeJSON(data, DTO: GitHubOAuthResponseDTO.self)
            return reponseData
        } catch {
            print("error : \(error)")
            throw NetworkingError.failedToSendAuthorizationCode
        }
    }
    
    /// GitHub OAuth 인증코드를 전달한 뒤, 이메일을 보내는 작업을 수행하는 메소드
    func sendEmail(_ email: String, jwtAccessToken: String) async throws -> (UserInfo, JWT) {
        do {
            let urlComponents = try self.makeUrlComponents(
                baseUrl: self.baseUrlString,
                path: "/api/members/signup",
                query: [:])
            let urlRequest = try self.makeUrlRequest(
                urlComponents,
                header: [
                    "Authorization": "Bearer\(jwtAccessToken)",
                    "Content-Type": "application/json",
                ],
                body: ["email": "\(email)"],
                httpMethod: .post)
            let userData = try await self.fetchData(with: urlRequest)
            let dto = try self.dataDecoder.decodeJSON(userData,
                                                              DTO: GitHubOAuthResponseDTO.self)
            let userInfo = UserInfo(name: dto.data.name, profileImageUrlString: dto.data.imgUrl)
            let jwt = JWT(accessToken: dto.data.jwtToken.accessToken,
                          refreshToken: dto.data.jwtToken.refreshToken)
            return (userInfo, jwt)
        } catch {
            throw NetworkingError.failedToSendEmail
        }
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
