//
//  HomeViewController.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/08.
//

import UIKit

class HomeViewController: UIViewController {
    let tableView = UITableView()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        
        self.view.addSubview(self.tableView)
        
        self.configureNavigationBar()
        self.configureTableView()
        self.setTableViewLayout()
    }
    
    private func configureNavigationBar() {
        let button = UIButton(type: .custom)
        button.setTitle("역삼1동", for: .normal)
        button.titleLabel?.font = FontStyle.headline
        button.setTitleColor(UIColor(named: "black"), for: .normal)
        
        let dong1 = UIAction(title: "역삼1동") {_ in
            
            
       }

       let configureDongButton = UIAction(title: "내 동네 설정하기") {_ in

           
       }

       let menu = UIMenu(title: "", options: .displayInline, children: [dong1, configureDongButton])

        button.menu = menu
        button.showsMenuAsPrimaryAction = true

        let barButtonItem = UIBarButtonItem(customView: button)
        
        self.navigationItem.leftBarButtonItem = barButtonItem
    }
    
    private func setTableViewLayout() {
        self.tableView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            self.tableView.topAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.topAnchor),
            self.tableView.leadingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.leadingAnchor),
            self.tableView.trailingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.trailingAnchor),
            self.tableView.bottomAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.bottomAnchor)
        ])
    }
    
    private func configureTableView() {
        self.tableView.dataSource = self
        self.tableView.delegate = self
        
        self.tableView.register(ProductTableViewCell.self, forCellReuseIdentifier: ProductTableViewCell.identifier)
    }
}

// MARK: UITableViewDataSource
extension HomeViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: ProductTableViewCell.identifier, for: indexPath) as? ProductTableViewCell else { return UITableViewCell() }
                return cell
    }
}

// MARK: UITableViewDelegate
extension HomeViewController: UITableViewDelegate {
    func numberOfSections(in tableView: UITableView) -> Int {
        1
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        let heightAspect: CGFloat = 120.0/393.0
        return heightAspect * self.view.frame.width
    }
}
