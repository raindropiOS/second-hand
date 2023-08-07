//
//  ChattingViewController.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/08.
//

import UIKit

class ChattingListViewController: UIViewController {
    
    weak var coordinator: ChattingCoordinator?
    let netwokrManager: NetworkManageable
    private let tableView: UITableView = .init()
    
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
        
        self.view.addSubview(self.tableView)
        
        self.layoutTableView()
    }
    
    private func layoutTableView() {
        self.tableView.translatesAutoresizingMaskIntoConstraints = false
        let safeArea = self.view.safeAreaLayoutGuide
        
        NSLayoutConstraint.activate([
            self.tableView.topAnchor.constraint(equalTo: safeArea.topAnchor),
            self.tableView.leadingAnchor.constraint(equalTo: safeArea.leadingAnchor),
            self.tableView.trailingAnchor.constraint(equalTo: safeArea.trailingAnchor),
            self.tableView.bottomAnchor.constraint(equalTo: safeArea.bottomAnchor)
        ])
    }
}
