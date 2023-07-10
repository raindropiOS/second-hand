//
//  URLRequestFactory.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/21.
//

import Foundation

class URLRequestFactory: URLRequestProducible {
    /// 본래 error 처리를 nil을 리턴하는 것으로 했었는데, error를 던질 수 있도록 작성해보았습니다.
    func makeUrlRequest(_ urlString: String, query: [String: String], httpMethod: HttpMethod) throws -> URLRequest {
        guard var urlComponents = URLComponents(string: urlString) else { throw URLRequestError.badUrlComponents  }
        let queryItems = query.map { URLQueryItem(name: $0.key, value: $0.value) }
        urlComponents.queryItems = queryItems
        guard let url = urlComponents.url else { throw URLRequestError.badUrl }
        var request = URLRequest(url: url, timeoutInterval: 30.0)
        request.httpMethod = httpMethod.rawValue
        return request
    }
}

protocol URLRequestProducible {
    func makeUrlRequest(_ urlString: String, query: [String: String], httpMethod: HttpMethod) throws -> URLRequest
}

enum URLRequestError: Error {
    case badUrl
    case badUrlComponents
}

enum HttpMethod: String {
    case `get` = "GET"
    case post = "POST"
}
