//
//  DataDecoder.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/21.
//

import Foundation

class DataDecoder: DataDecodable {
    func decodeJSON<T: Decodable>(_ data: Data, DTO: T.Type) throws -> Decodable {
        do {
            return try JSONDecoder().decode(DTO.self, from: data)
        } catch {
            throw DecodingError.failedToDecodeJSON
        }
    }
}

protocol DataDecodable {
    func decodeJSON<T: Decodable>(_ data: Data, DTO: T.Type) throws -> Decodable
}

enum DecodingError: Error {
    case failedToDecodeJSON
}
