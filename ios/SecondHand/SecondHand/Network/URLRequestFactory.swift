//
//  URLRequestFactory.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/21.
//

import Foundation

class URLRequestFactory: URLRequestProducible {
    func makeUrlRequest(_ urlString: String, query: [String: String], httpMethod: HttpMethod) throws -> URLRequest {
        guard var urlComponents = URLComponents(string: urlString) else { throw URLRequestError.badUrlComponents  }
        let queryItems = query.map { URLQueryItem(name: $0.key, value: $0.value) }
        urlComponents.queryItems = queryItems
        guard let url = urlComponents.url else { throw URLRequestError.badUrl }
        var request = URLRequest(url: url, timeoutInterval: 30.0)
        request.httpMethod = httpMethod.rawValue
        return request
    }
    
    func makeUrlRequest(_ urlString: String, query: [String: String], header: [String: String], body: String, httpMethod: HttpMethod) throws -> URLRequest {
        guard var urlComponents = URLComponents(string: urlString) else { throw URLRequestError.badUrlComponents  }
        let queryItems = query.map { URLQueryItem(name: $0.key, value: $0.value) }
        urlComponents.queryItems = queryItems
        guard let url = urlComponents.url else { throw URLRequestError.badUrl }
        var request = URLRequest(url: url, timeoutInterval: 30.0)
        
        // 헤더 수정
        for (key, value) in header {
            request.setValue(key, forHTTPHeaderField: value)
        }
        
        // 바디 수정
        let bodyData = body.data(using: .utf8)
        request.httpBody = bodyData
        
        // 메소드 수정
        request.httpMethod = httpMethod.rawValue
        return request
    }
}

protocol URLRequestProducible {
    func makeUrlRequest(_ urlString: String, query: [String: String], httpMethod: HttpMethod) throws -> URLRequest
    
    func makeUrlRequest(_ urlString: String, query: [String: String], header: [String: String], body: String, httpMethod: HttpMethod) throws -> URLRequest
}

enum URLRequestError: Error {
    case badUrl
    case badUrlComponents
}

enum HttpMethod: String {
    case `get` = "GET"
    case post = "POST"
}
