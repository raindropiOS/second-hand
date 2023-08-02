//
//  LikeListViewController.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/08.
//

import UIKit

class LikeListViewController: UIViewController {
    
    weak var coordinator: LikeListCoordinator?
    let netwokrManager: NetworkManageable
    
    init(netwokrManager: NetworkManageable) {
        self.netwokrManager = netwokrManager
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        self.view.backgroundColor = .white
    }
}
