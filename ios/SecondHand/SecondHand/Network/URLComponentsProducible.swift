//
//  URLComponentsProducible.swift
//  SecondHand
//
//  Created by 에디 on 2023/07/14.
//

import Foundation

protocol URLComponentsProducible {
    func makeUrlComponents(baseUrl: String, path: String, parameters: [String: String]) throws -> URLComponents
}

extension URLComponentsProducible {
    func makeUrlComponents(baseUrl: String, path: String, parameters: [String: String]) throws -> URLComponents {
        guard var urlComponents = URLComponents(string: baseUrl) else { throw UrlComponentsError.failedToMakeUrlComponents}
        
        // Path 반영
        urlComponents.path = path
        
        // Parameter 수정
        let queryItems = parameters.map { URLQueryItem(name: $0.key, value: $0.value) }
        urlComponents.queryItems = queryItems
        
        return urlComponents
    }
}

enum UrlComponentsError: Error {
    case failedToMakeUrlComponents
}
