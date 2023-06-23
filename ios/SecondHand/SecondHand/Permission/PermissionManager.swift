//
//  PermissionManager.swift
//  SecondHand
//
//  Created by 김하림 on 2023/06/20.
//

import Foundation
import PhotosUI

class PermissionManager {
    
    // Singleton 인스턴스 생성
    static let shared = PermissionManager()
    
    private init() {}
    
    // 권한 상태 확인
    func checkPhotoLibraryAuthorizationStatus(completion: @escaping (Bool) -> Void) {
        let status = PHPhotoLibrary.authorizationStatus(for: .readWrite)
        switch status {
        case .authorized: // 이미 허용되었을 때
            completion(true)
        case .notDetermined: // 사용자가 아직 결정하지 못했을 때
            PHPhotoLibrary.requestAuthorization(for: .readWrite) { newStatus in
                completion(newStatus == .authorized)
            }
        default: // 거부되었거나 제한된 경우
            completion(false)
        }
    }
}
