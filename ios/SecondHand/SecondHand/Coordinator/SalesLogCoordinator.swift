//
//  SalesLogCoordinator.swift
//  SecondHand
//
//  Created by 김하림 on 2023/07/20.
//

import UIKit

class SalesLogCoordinator: Coordinator {
    
    var delegate: CoordinatorFinishDelegate?
    
    var presenter: UINavigationController
    
    var childCoordinators: [Coordinator]
    
    init(presenter: UINavigationController) {
        self.presenter = presenter
        self.childCoordinators = []
    }
    
    func start(networkManager: NetworkManageable) {
        let salesLogViewController = SalesLogViewController(netwokrManager: networkManager)
        salesLogViewController.coordinator = self
        salesLogViewController.title = "판매 내역"
        presenter.pushViewController(salesLogViewController, animated: true)
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
