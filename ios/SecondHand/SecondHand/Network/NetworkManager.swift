//
//  NetworkManager.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/06.
//

import Foundation

class NetworkManager {
    static let shared = NetworkManager()
    
    func requestGithubOAuth() {
        let clientId: String = "exampleId"
        let urlString = "https://github.com/login/oauth/authorize"
        let query = ["client_id": clientId]
        let queryItems = query.map { URLQueryItem(name: $0.key, value: $0.value) }
        
        guard var urlComponents = URLComponents(string: urlString) else { return }
        urlComponents.queryItems = queryItems
        
        // Github: GET
        guard let url = urlComponents.url else { return }
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "GET"
        urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        URLSession.shared.dataTask(with: urlRequest) { (data, response, error) in
            if let response = response {
                print("response : \(response)")
                guard let data = data else { return }
                print(String(data: data, encoding: .utf8))
            }
            
            if let error = error {
                print("error : \(error)")
            }
        }.resume()
    }
    
}
