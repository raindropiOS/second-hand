//
//  ChattingViewController.swift
//  SecondHand
//
//  Created by 에디 on 2023/08/08.
//

import UIKit

class ChattingViewController: UIViewController {
    let viewModel: ChattingViewModel
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
    }
    
    init(viewModel: ChattingViewModel) {
        self.viewModel = viewModel
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
