//
//  UrlRequestable.swift
//  SecondHand
//
//  Created by 에디 on 2023/07/27.
//

import Foundation

protocol URLRequestable {
    func fetchData(with urlRequest: URLRequest) async throws -> Data
}

extension URLRequestable {
    func fetchData(with urlRequest: URLRequest) async throws -> Data {
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
}
