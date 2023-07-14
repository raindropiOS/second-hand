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
    private let clientId = Bundle.main.infoDictionary?["githubClientId"] as? String ?? ""
    private let githubBaseUrl = "https://github.com"
    private lazy var githubOAuthParameters = ["client_id": self.clientId, "scope": "user public_repo"]
    
    func fetchProducts(query: [String: String]) async -> [Product] {
        do {
            let urlComponents = try self.makeUrlComponents(baseUrl: baseUrlString, path: "/api", parameters: [:])
            let urlRequest = try self.makeUrlRequest(urlComponents, header: [:], body: [:], httpMethod: .get)
            let data = try await fetchData(with: urlRequest)
            let productsForm = try dataDecoder.decodeJSON(data, DTO: Form.self) as? Form
            let products: [Product]? = productsForm?.data
            return products ?? []
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
            let urlRequest = try self.makeUrlRequest(urlString, query: [:], httpMethod: .get)
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
extension NetworkManager {
    func presentGithubOAuthLoginScreen() {
        let path = "/login/oauth/authorize"
        
        do {
            let urlComponents = try self.makeUrlComponents(baseUrl: self.githubBaseUrl, path: path, parameters: self.githubOAuthParameters)
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
    
    func sendAuthorizationCode(_ code: String) async throws -> Decodable {
        let body = ["authorizationCode": "\(code)", "oAuthProvider": "GITHUB"]
        let header = ["Content-Type": "application/json"]
        
        do {
            let urlComponents = try self.makeUrlComponents(baseUrl: self.baseUrlString, path: "/auth/login", parameters: [:])
            let urlRequest = try self.makeUrlRequest(urlComponents, header: header, body: body, httpMethod: .post)
            let data = try await self.fetchData(with: urlRequest)
            let reponseData = try self.dataDecoder.decodeJSON(data, DTO: OAuthLoginResponseDTO.self)
            return reponseData
        } catch {
            print("error : \(error)")
            throw NetworkingError.failedToSendAuthorizationCode
        }
    }
}

protocol NetworkManageable {
    func fetchProducts(query: [String: String]) async -> [Product]
    func presentGithubOAuthLoginScreen()
}

enum NetworkingError: Error {
    case failedToGetQueryItemValue
    case failedToSendAuthorizationCode
}
