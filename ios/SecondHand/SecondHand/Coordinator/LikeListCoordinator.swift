//
//  LikeListCoordinator.swift
//  SecondHand
//
//  Created by 김하림 on 2023/07/20.
//

import UIKit

class LikeListCoordinator: Coordinator {
    
    var delegate: CoordinatorFinishDelegate?
    
    var presenter: UINavigationController
    
    var childCoordinators: [Coordinator]
    
    init(presenter: UINavigationController) {
        self.presenter = presenter
        self.childCoordinators = []
    }

    func start(networkManager: NetworkManageable) {
        let likeListViewController = LikeListViewController(netwokrManager: networkManager)
        likeListViewController.coordinator = self
        likeListViewController.title = "관심 목록"
        presenter.pushViewController(likeListViewController, animated: true)
        separatorLine()
    }
    
    private func separatorLine() {
        let appearance = UINavigationBarAppearance()
        appearance.backgroundColor = .white
        appearance.shadowColor = .separator
        self.presenter.navigationBar.scrollEdgeAppearance = appearance
        self.presenter.navigationBar.standardAppearance = appearance
    }
}
