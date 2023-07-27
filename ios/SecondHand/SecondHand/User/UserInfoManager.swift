//
//  UserInfoManager.swift
//  SecondHand
//
//  Created by 에디 on 2023/07/25.
//

import Combine
import Foundation

/// 뷰에 필요한 유저 정보를 저장하는 Repository Layer
class UserInfoManager: URLRequestProducible, URLComponentsProducible {
    static let shared = UserInfoManager()
    @Published var isSignedIn = false
    @Published var userInfo: UserInfo?
}
