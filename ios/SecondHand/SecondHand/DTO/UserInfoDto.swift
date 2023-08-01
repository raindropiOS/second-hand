//
//  UserInfoDto.swift
//  SecondHand
//
//  Created by 에디 on 2023/07/26.
//

import Foundation

struct UserInfoDto: Decodable {
    let success: Bool
    let httpStatus: String
    let apiStatus: Int
    let data: UserInfoDataWithoutJwt
    let message: String
}

struct UserInfoDataWithoutJwt: Decodable {
    let name: String
    let imgUrl: String
}
