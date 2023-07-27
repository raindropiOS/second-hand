//
//  LoginManager.swift
//  SecondHand
//
//  Created by 에디 on 2023/07/27.
//

import Foundation
import UIKit.UIApplication

class LoginManager: LoginManageable, URLRequestable, URLRequestProducible, URLComponentsProducible {
    private let dataDecoder: DataDecodable = DataDecoder()
    private let baseUrlString = Bundle.main.infoDictionary?["baseUrl"] as? String ?? ""
    private let basePath = "/api"
    private let clientId = Bundle.main.infoDictionary?["githubClientId"] as? String ?? ""
    private let githubBaseUrl = "https://github.com"
    private lazy var githubOAuthParameters = ["client_id": self.clientId, "scope": "user public_repo"]
    
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
}

protocol LoginManageable {
    func presentGithubOAuthLoginScreen()
    func getQueryItemValue(urlString: String, key: String) throws -> String
    func sendAuthorizationCode(_ code: String) async throws -> GitHubOAuthResponseDTO
    func sendEmail(_ email: String, jwtAccessToken: String) async throws -> (UserInfo, JWT)
}
