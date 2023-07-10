//
//  OAuthLoginResponseDTO.swift
//  SecondHand
//
//  Created by 에디 on 2023/07/10.
//

import Foundation

struct OAuthLoginResponseDTO: Decodable {
    let success: Bool
    let httpStatus: String
    let apiStatus: Int
    let data: UserInfoData
    let message: String
}

struct UserInfoData: Decodable {
    let name: String
    let imgUrl: String
    let jwtToken: String
}
