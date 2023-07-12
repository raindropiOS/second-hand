//
//  JWT.swift
//  SecondHand
//
//  Created by 에디 on 2023/07/12.
//

import Foundation

// Keychain에 저장할 구조체
struct JWT {
    let token: String
    let expirationTime: String
}
