//
//  TabBarController.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/08.
//

import UIKit

class TabBarController: UITabBarController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.tabBar.backgroundColor = UIColor(named: "gray200")
        setTabViewControllers()
    }
    
    private func setTabViewControllers() {
        let homeViewController = UINavigationController(rootViewController: HomeViewController())
        let salesLogViewController = SalesLogViewController()
        let likeListViewController = LikeListViewController()
        let chattingViewController = ChattingViewController()
        let signInViewController = UINavigationController(rootViewController: SignInViewController())
        
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
}
