//
//  KeychainManager.swift
//  SecondHand
//
//  Created by 에디 on 2023/07/12.
//

import Foundation

class KeychainManager: KeychainManageable {
    private let appName = "com.team02.SecondHand"
    /// GitHub OAuth 인증코드를 서버에 전달하고 받은 토큰, 이를 이메일과 함께 다시 보내 인증을 완료한다.
    var temporarySavedJwt: JWT?
    
    func saveJWT(_ jwt: JWT) async {
        /*
         1. 기존에 저장된 JWT가 있는지 확인
         2. 키체인 아이템 추가 또는 업데이트
            a. 없는 경우) 키체인 아이템을 추가한다
            b. 있는 경우) 기존 키체인 아이템을 업데이트
         */
        
        let jwtIsAlreadyPresentInKeychain = await self.findJWT(jwt)
        
        if jwtIsAlreadyPresentInKeychain {
            self.updateJWT(jwt)
        } else {
            self.addJWT(jwt)
        }
    }
    
    func addJsonWebToken(_ jwt: JWT, email: String) async throws {
        let accessToken = jwt.accsssToken
        let refreshToken = jwt.refreshToken
        let token = accessToken + "*" + refreshToken
        let attrs: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: email,
            kSecAttrService as String: self.appName,
            kSecValueData as String: token.data(using: .utf8) as Any,
        ]
        
        let status = SecItemAdd(attrs as CFDictionary, nil)
        
        if status != errSecSuccess {
            throw KeychainManagerError.failedToAddJsonWebToken
        }
    }
    
    private func findJWT(_ jwt: JWT) async -> Bool {
        // 추가 쿼리 만들기
        let token = jwt.token
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecValueData as String: token.data(using: .utf8) as Any,
        ]
        
        let status = await self.findKeychainItem(attributes: query as CFDictionary)
        if status != errSecSuccess {
            print("failed to find item")
            return false
        } else {
            print("found item")
            return true
        }
    }
    
    func updateJWT(_ jwt: JWT) {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword
        ]
        
        let newToken = jwt.token
        let newAttrs: [String: Any] = [
            kSecValueData as String: newToken.data(using: .utf8) as Any,
        ]
        
        self.updateKeychainItem(searchAttributes: query as CFDictionary, update: newAttrs as CFDictionary) { status in
            if status == errSecSuccess {
                print("updated item")
            } else {
                print("failed to update item")
                print("status : \(status)")
            }
        }
    }
}

extension KeychainManager {
    private func addKeychainItem(attributes attrs: CFDictionary, _ completion: @escaping (OSStatus, CFTypeRef?) -> Void) {
        DispatchQueue.global().async {
            var item: CFTypeRef?
            let result = SecItemAdd(attrs, &item)
            completion(result, item)
        }
    }
    
    private func findKeychainItem(attributes attrs: CFDictionary) async -> OSStatus {
        return await withCheckedContinuation { continuation in
            DispatchQueue.global().async {
                var item: CFTypeRef?
                let result = SecItemCopyMatching(attrs, &item)
                
                continuation.resume(returning: result)
            }
        }
    }
    
    private func updateKeychainItem(searchAttributes attrs: CFDictionary, update updateAttrs: CFDictionary, _ completion: @escaping (OSStatus) -> Void) {
        DispatchQueue.global().async {
            let result = SecItemUpdate(attrs, updateAttrs)
            completion(result)
        }
    }
}

/// Json Web Token,
/// Keychain에 저장할 구조체
struct JWT {
    let accsssToken: String
    let refreshToken: String
}

protocol KeychainManageable {
    func saveJWT(_ jwt: JWT) async
    var temporarySavedJwt: JWT? { get set }
}

enum KeychainManagerError: Error {
    case failedToAddJsonWebToken
    case failedToReadJsonWebToken
    /// 찾은 키체인 아이템의 타입 캐스팅 실패
    case failedToTypeCast
    /// 키체인에 저장된 JWT 코드가 String이 아닐 때
    case failedToConvertKeychainValueToString
    /// JWT -> Data 인코딩 실패
    case failedToMakeTokenData
    case failedToUpdateJsonWebToken
}
