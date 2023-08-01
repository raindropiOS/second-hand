//
//  UserInfoManager.swift
//  SecondHand
//
//  Created by 에디 on 2023/07/25.
//

import Combine
import Foundation

class UserManager {
    static let shared = UserManager()
    @Published var isSignedIn = false
    @Published var userInfo: UserInfo?
}
