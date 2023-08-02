//
//  HomeCoordinator.swift
//  SecondHand
//
//  Created by 김하림 on 2023/07/20.
//

import UIKit

class HomeCoordinator: Coordinator {
    var delegate: CoordinatorFinishDelegate?
    
    var presenter: UINavigationController
    
    var childCoordinators: [Coordinator]
    
    init(presenter: UINavigationController) {
        self.presenter = presenter
        self.childCoordinators = []
    }
    
    func start(networkManager: NetworkManageable) {
        let pastTimeCalculator: PastTimeCalculable = PastTimeCalculator()
        let productRepository: ProductRepository = ProductRepository(networkManagerDelegate: networkManager)
        let productListViewModel = ProductListViewModel(productRepository: productRepository, pastTimeCalculator: pastTimeCalculator)
        let homeViewController = HomeViewController(productListViewModel: productListViewModel, netwokrManager: networkManager)
        homeViewController.coordinator = self
        presenter.pushViewController(homeViewController, animated: true)
    }
    
    func moveToTown() {
        
    }
}
