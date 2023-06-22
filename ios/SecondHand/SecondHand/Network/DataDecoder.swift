//
//  DataDecoder.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/21.
//

import Foundation

class DataDecoder: DataDecodable {
    func decodeJSON<T: Decodable>(_ data: Data, DTO: T.Type) -> Decodable? {
        do {
            return try JSONDecoder().decode(DTO.self, from: data)
        } catch {
            return nil
        }
    }
}

protocol DataDecodable {
    func decodeJSON<T: Decodable>(_ data: Data, DTO: T.Type) -> Decodable?
}
