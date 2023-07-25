//
//  UserInfoManager.swift
//  SecondHand
//
//  Created by 에디 on 2023/07/25.
//

import Combine
import Foundation

class UserInfoManager: URLRequestProducible, URLComponentsProducible {
    static let shared = UserInfoManager()
    private let keychainManagerDelegate: KeychainManageable?
    private var jwt: JWT?
    @Published var isSignedIn = false
    
    init() {
        self.keychainManagerDelegate = KeychainManager()
    }
    
    func readJsonWebToken() async throws {
        if let jwt = try await self.keychainManagerDelegate?.readJsonWebToken() {
            self.jwt = jwt
            self.isSignedIn = true
        }
    }
}
