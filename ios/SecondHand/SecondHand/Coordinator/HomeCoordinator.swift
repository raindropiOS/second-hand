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
    
    func start() {
        let pastTimeCalculator: PastTimeCalculable = PastTimeCalculator()
        let productListViewModel = ProductListViewModel(productRepository: ProductRepository(), pastTimeCalculator: pastTimeCalculator)
        let homeViewController = HomeViewController(productListViewModel: productListViewModel)
        homeViewController.coordinator = self
        presenter.pushViewController(homeViewController, animated: true)
    }
    
    func moveToTown() {
        
    }
}
