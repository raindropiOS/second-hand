//
//  AppDelegate.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/05.
//

import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // 앱이 시작될 때 수행할 초기화 작업
        Task {
            do {
                try await UserInfoManager.shared.readJsonWebToken()
            } catch {
                print("error: \(error)")
            }
        }
        
        return true
    }
}
