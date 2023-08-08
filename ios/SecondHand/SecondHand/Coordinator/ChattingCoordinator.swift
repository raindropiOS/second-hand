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

    func start(networkManager: NetworkManageable) {
        // viewModel 대신 Repository를 주입하는 방향으로 변경하기
        let chattingInfoTest: ChattingListTableViewCellViewModel = {
            let testImage = "https://avatars.githubusercontent.com/u/70703326?s=400&u=c5ffc7dcb01636329983614424376f63713befc1&v=4"
           let viewModel = ChattingListTableViewCellViewModel(
            userImageUrl: testImage,
            userName: "에디",
            timePast: "3시간 전",
            lastChatMessage: "난 원한다 당신의 상품",
            productImageUrl: testImage
           )
            return viewModel
        }()
        let viewModel = ChattingListViewModel(chattingList: [chattingInfoTest])
        let chattingViewController = ChattingListViewController(netwokrManager: networkManager,
                                                                viewModel: viewModel)
        chattingViewController.coordinator = self
        chattingViewController.title = "채팅"
        presenter.pushViewController(chattingViewController, animated: true)
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
