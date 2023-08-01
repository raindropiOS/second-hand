//
//  Coordinator.swift
//  SecondHand
//
//  Created by 김하림 on 2023/07/17.
//

import UIKit


protocol CoordinatorFinishDelegate {
    func coordinatorDidFinish()
    func removeChildCoordinator(_ coordinator: Coordinator)
}


protocol Coordinator: AnyObject, CoordinatorFinishDelegate {
    
    var delegate: CoordinatorFinishDelegate? { get set }
    
    var presenter: UINavigationController { get set }
    
    var childCoordinators: [Coordinator] { get set }
    
    func start()
}


extension Coordinator {
    func start() { }
    
    func coordinatorDidFinish() {
        delegate?.removeChildCoordinator(self)
    }
    
    func removeChildCoordinator(_ coordinator: Coordinator) {
        for (index, child) in childCoordinators.enumerated() {
            if coordinator === child {
                childCoordinators.remove(at: index)
                break
            }
        }
    }
    
}
