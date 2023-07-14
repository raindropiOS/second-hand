//
//  URLRequestFactory.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/21.
//

import Foundation

protocol URLRequestProducible {
    func makeUrlRequest(_ urlString: String, query: [String: String], httpMethod: HttpMethod) throws -> URLRequest
    
    func makeUrlRequest(_ urlString: String, query: [String: String], header: [String: String], body: [String: String], httpMethod: HttpMethod) throws -> URLRequest
    
    func makeUrlRequest(_ urlComponents: URLComponents, header: [String: String], body: [String: String], httpMethod: HttpMethod) throws -> URLRequest
}

extension URLRequestProducible {
    func makeUrlRequest(_ urlString: String, query: [String: String], httpMethod: HttpMethod) throws -> URLRequest {
        guard var urlComponents = URLComponents(string: urlString) else { throw URLRequestError.badUrlComponents  }
        let queryItems = query.map { URLQueryItem(name: $0.key, value: $0.value) }
        urlComponents.queryItems = queryItems
        guard let url = urlComponents.url else { throw URLRequestError.badUrl }
        var request = URLRequest(url: url, timeoutInterval: 30.0)
        request.httpMethod = httpMethod.rawValue
        return request
    }
    
    func makeUrlRequest(_ urlString: String, query: [String: String], header: [String: String], body: [String: String], httpMethod: HttpMethod) throws -> URLRequest {
        guard var urlComponents = URLComponents(string: urlString) else { throw URLRequestError.badUrlComponents  }
        let queryItems = query.map { URLQueryItem(name: $0.key, value: $0.value) }
        urlComponents.queryItems = queryItems
        guard let url = urlComponents.url else { throw URLRequestError.badUrl }
        var request = URLRequest(url: url, timeoutInterval: 30.0)
        
        // 헤더 수정
        for (key, value) in header {
            request.setValue(value, forHTTPHeaderField: key)
        }
        
        // 바디 수정
        let jsonData = try? JSONSerialization.data(withJSONObject: body)
        request.httpBody = jsonData
        
        // 메소드 수정
        request.httpMethod = httpMethod.rawValue
        return request
    }
    
    func makeUrlRequest(_ urlComponents: URLComponents, header: [String: String], body: [String: String], httpMethod: HttpMethod) throws -> URLRequest {
        guard let url = urlComponents.url else { throw URLRequestError.badUrl }
        var urlRequest = URLRequest(url: url, timeoutInterval: 5.0)
        
        // 헤더 수정
        for (key, value) in header {
            urlRequest.setValue(value, forHTTPHeaderField: key)
        }
        
        // 바디 수정
        let jsonData = try? JSONSerialization.data(withJSONObject: body)
        urlRequest.httpBody = jsonData
        
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
