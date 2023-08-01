//
//  URLRequestFactory.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/21.
//

import Foundation

protocol URLRequestProducible {
    func makeUrlRequest(_ urlComponents: URLComponents, header: [String: String], body: [String: String], httpMethod: HttpMethod) throws -> URLRequest
}

extension URLRequestProducible {
    func makeUrlRequest(_ urlComponents: URLComponents, header: [String: String], body: [String: String], httpMethod: HttpMethod) throws -> URLRequest {
        guard let url = urlComponents.url else { throw URLRequestError.badUrl }
        var urlRequest = URLRequest(url: url, timeoutInterval: 5.0)
        
        // 헤더 수정
        for (key, value) in header {
            urlRequest.setValue(value, forHTTPHeaderField: key)
        }
        if httpMethod != .get {
            // 바디 수정
            let jsonData = try? JSONSerialization.data(withJSONObject: body)
            urlRequest.httpBody = jsonData
        }
        
        // 메소드 수정
        urlRequest.httpMethod = httpMethod.rawValue
        
        return urlRequest
    }
}

enum URLRequestError: Error {
    case badUrl
    case badUrlComponents
}

enum HttpMethod: String {
    case `get` = "GET"
    case post = "POST"
}
