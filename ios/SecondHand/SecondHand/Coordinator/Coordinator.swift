//
//  Coordinator.swift
//  SecondHand
//
//  Created by 김하림 on 2023/07/17.
//

import UIKit


protocol Coordinator: AnyObject, CoordinatorFinishDelegate {
    
    var delegate: CoordinatorFinishDelegate? { get set }
    
    var presenter: UINavigationController { get set }
    
    var childCoordinators: [Coordinator] { get set }
    
    func start()
}
