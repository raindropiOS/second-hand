//
//  TabBarController.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/08.
//

import Combine
import UIKit

class TabBarController: UITabBarController {
    weak var coordinator: TabBarCoordinator?
    private var networkManager: NetworkManageable
    private let keychainManager: KeychainManageable
    var cancellables = Set<AnyCancellable>()
    
    init(networkManager: NetworkManageable, keychainManager: KeychainManageable) {
        self.networkManager = networkManager
        self.keychainManager = keychainManager
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.tabBar.backgroundColor = UIColor(named: "gray200")
        
        Task {
            do {
                // 저장된 JWT를 정상적으로 읽은 경우 -> 로그인 상태로 뷰 처리
                self.networkManager.jwt = try await self.keychainManager.readJsonWebToken()
                UserManager.shared.isSignedIn = true
            } catch {
                // 저장된 JWT를 읽지 못한 경우 -> 비로그인 상태로 뷰 처리
                print("error: \(error)")
            }
        }
    }
}
