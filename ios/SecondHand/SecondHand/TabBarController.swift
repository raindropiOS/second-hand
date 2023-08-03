//
//  TabBarController.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/08.
//

import Combine
import UIKit

class TabBarController: UITabBarController {
    weak var coordinator: TabBarCoordinator?
    private var networkManager: NetworkManageable
    var cancellables = Set<AnyCancellable>()
    
    init(networkManager: NetworkManageable) {
        self.networkManager = networkManager
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.tabBar.backgroundColor = UIColor(named: "gray200")
    }
}
