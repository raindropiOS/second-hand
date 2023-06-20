//
//  Form.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/20.
//

import Foundation

struct Form: Decodable {
    let success: Bool
    let status: Int
    let code: Int
    let data: [Product]
}
