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

/// 임시 DTO이자 Combine 대상.
/// 유저 정보를 담아 관리할 수도 있을 것으로 기대
class User {
    /// 임시용
    static let shared: User = {
        let user = User()
        let defaultDong = Dong(name: "역삼1동")
        user.addDong(defaultDong)
        return user
    }()
    
    /// 차후 userInfo 타입 선언뒤, nil 값이 아니면 true 반환하여 판별해도 될 듯.
    var isSignedIn: Bool = true
    var selectedDong: Dong? {
        return dongs[0]
    }
    private var dongs: [Dong] = []
    
    func addDong(_ dong: Dong) {
        dongs.append(dong)
    }
}

struct Dong {
    let name: String
}
