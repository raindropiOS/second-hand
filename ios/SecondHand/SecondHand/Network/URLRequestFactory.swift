//
//  URLRequestFactory.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/21.
//

import Foundation

class URLRequestFactory: URLRequestProducible {
    func makeUrlRequest(_ urlString: String, query: [String: String] = [:]) -> URLRequest? {
        guard let url = URL(string: urlString) else { return nil }
        guard var urlComponents = URLComponents(string: urlString) else { return nil }
        let queryItems = query.map { URLQueryItem(name: $0.key, value: $0.value) }
        urlComponents.queryItems = queryItems
        guard let newUrl = urlComponents.url else { return nil }
        let request = URLRequest(url: newUrl, timeoutInterval: 30.0)
        return request
    }
}

protocol URLRequestProducible {
    func makeUrlRequest(_ urlString: String, query: [String: String]) -> URLRequest?
}
