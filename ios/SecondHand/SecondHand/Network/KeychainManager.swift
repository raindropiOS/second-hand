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
    
    func readJsonWebToken(email: String) async throws -> JWT {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: email,
            kSecAttrService as String: self.appName,
            kSecReturnAttributes as String: true, // item이 nil이 되지 않고 확인 가능
            kSecReturnData as String: true // data로 저장한 token 출력 가능
        ]
        
        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)
        
        if status != errSecSuccess {
            throw KeychainManagerError.failedToReadJsonWebToken
        } else {
            if let attributes = result as? NSDictionary,
               let tokenData = attributes[kSecValueData] as? Data,
               let tokenString = String(data: tokenData, encoding: .utf8) {
                let tokens = tokenString.components(separatedBy: "*")
                let jwt = JWT(accsssToken: tokens[0], refreshToken: tokens[1])
                return jwt
            } else {
                throw KeychainManagerError.failedToTypeCast
            }
        }
    }
    
    func updateJsonWebToken(email: String, newJwt: JWT) async throws {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: email,
            kSecAttrService as String: self.appName,
        ]
        
        let tokenString = newJwt.accsssToken + "*" + newJwt.refreshToken
        guard let tokenData = tokenString.data(using: .utf8) else {
            throw KeychainManagerError.failedToMakeTokenData
        }
        let attributesToUpdate: [String: Any] = [
            kSecValueData as String: tokenData,
        ]
        
        let status = SecItemUpdate(query as CFDictionary, attributesToUpdate as CFDictionary)
        if status != errSecSuccess {
            throw KeychainManagerError.failedToUpdateJsonWebToken
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
