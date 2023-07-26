//
//  TabBarController.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/08.
//

import Combine
import UIKit

class TabBarController: UITabBarController {
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
        
        UserInfoManager.shared.$isSignedIn
            .sink { [weak self] newData in
                if newData == true {
                    self?.updateProfileView()
                }
            }
            .store(in: &cancellables)
        self.setTabViewControllers()
        Task {
            do {
                // 저장된 JWT를 정상적으로 읽은 경우 -> 로그인 상태로 뷰 처리
                self.networkManager.jwt = try await self.keychainManager.readJsonWebToken()
                DispatchQueue.main.async {
                    self.updateProfileView()
                }
            } catch {
                // 저장된 JWT를 읽지 못한 경우 -> 비로그인 상태로 뷰 처리
                print("error: \(error)")
            }
        }
    }
    
    private func setTabViewControllers() {
        let pastTimeCalculator: PastTimeCalculable = PastTimeCalculator()
        let productListViewModel = ProductListViewModel(productRepository: ProductRepository(), pastTimeCalculator: pastTimeCalculator)
        
        let homeViewController = UINavigationController(rootViewController: HomeViewController(productListViewModel: productListViewModel))
        let salesLogViewController = SalesLogViewController()
        let likeListViewController = LikeListViewController()
        let chattingViewController = ChattingViewController()
        let signInViewController = UINavigationController(rootViewController: SignInViewController(networkManager: self.networkManager))
        
        let viewControllers = [
            homeViewController,
            salesLogViewController,
            likeListViewController,
            chattingViewController,
            signInViewController
        ]
        
        self.setViewControllers(viewControllers, animated: false)
        
        if let items = self.tabBar.items {
            items[0].title = "홈"
            items[0].image = UIImage(systemName: "house")
            
            items[1].title = "판매내역"
            items[1].image = UIImage(systemName: "newspaper")
            
            items[2].title = "관심목록"
            items[2].image = UIImage(systemName: "heart")
            
            items[3].title = "채팅"
            items[3].image = UIImage(systemName: "message")
            
            items[4].title = "내 계정"
            items[4].image = UIImage(systemName: "person")
        }
    }
    
    private func updateProfileView() {

        Task {
            let userInfo = try await self.networkManager.fetchProfileInfo()
            let profileViewModel = ProfileViewModel(
                profileImageUrlString: userInfo.profileImageUrlString,
                userName: userInfo.name)
            
            DispatchQueue.main.async {
                self.viewControllers?[4] = ProfileViewController(
                    networkManager: self.networkManager,
                    viewModel: profileViewModel)
                
                if let items = self.tabBar.items {
                    items[4].title = "내 계정"
                    items[4].image = UIImage(systemName: "person")
                }
            }
        }
    }
}
