//
//  DataDecoder.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/21.
//

import Foundation

class DataDecoder {
    func decodeJSON<T: Decodable>(_ data: Data) throws -> T {
        try JSONDecoder().decode(T.self, from: data)
    }
}

protocol DataDecodable {
    func decodeJSON<T: Decodable>(_ data: Data) throws -> T
}
