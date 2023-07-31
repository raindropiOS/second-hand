//
//  ChattingCoordinator.swift
//  SecondHand
//
//  Created by 김하림 on 2023/07/20.
//

import UIKit

class ChattingCoordinator: NSObject, Coordinator {
    
    var childCoordinators: [Coordinator]
    
    var delegate: CoordinatorFinishDelegate?
    
    var presenter: UINavigationController
    
    init(presenter: UINavigationController) {
        self.presenter = presenter
        self.childCoordinators = []
    }
    
    func start() {
        let chattingVC = ChattingViewController()
        chattingVC.coordinator = self
        chattingVC.title = "채팅 목록"
        presenter.pushViewController(chattingVC, animated: true)
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
