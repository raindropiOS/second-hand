//
//  ProfileViewController.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/08.
//

import UIKit

class ProfileViewController: UIViewController {
    private let networkManager: NetworkManageable
    private let viewModel: ProfileViewModel
    let navigationBar: UINavigationBar = {
        let bar = UINavigationBar()
        bar.barTintColor = .white
        let item = UINavigationItem(title: "내 계정")
        bar.setItems([item], animated: true)
        return bar
    }()
    let separatorViewUnderNavigationBar: SeparatorView = SeparatorView()
    let profileImageView = ProfileImageView()
    let nameLabel = UILabel()
    let signOutButton = SignInOutButton()
    let profileImageViewSize: CGSize = CGSize(width: 100, height: 100)
    
    init(networkManager: NetworkManageable, viewModel: ProfileViewModel) {
        self.networkManager = networkManager
        self.viewModel = viewModel
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        self.view.backgroundColor = .white
        self.configureProfileImageView()
        self.configureSeparatorViewUnderNavigationBar()
        self.configureNameLabel()
        self.configureSignOutButton()
        self.layoutNavigationBar()
        self.loadProfile()
    }
    
    private func setName(_ name: String) {
        self.nameLabel.text = name
    }
    
    private func setImage(_ uiImage: UIImage) {
        self.profileImageView.image = uiImage
    }
    
    private func loadProfile() {
        let imageUrlString = self.viewModel.profileImageUrlString
        let userName = self.viewModel.userName
        
        self.profileImageView.loadImage(imageUrlString)
        self.setName(userName)
    }
    
    @objc func signOutButtonTouched() {
        UserInfoManager.shared.isSignedIn = false
    }
}

extension ProfileViewController {
    private func configureSeparatorViewUnderNavigationBar() {
        self.view.addSubview(separatorViewUnderNavigationBar)
        self.separatorViewUnderNavigationBar.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            self.separatorViewUnderNavigationBar.topAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.topAnchor),
            self.separatorViewUnderNavigationBar.leadingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.leadingAnchor),
            self.separatorViewUnderNavigationBar.trailingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.trailingAnchor),
            self.separatorViewUnderNavigationBar.heightAnchor.constraint(equalToConstant: SeparatorView.height)
        ])
        self.separatorViewUnderNavigationBar.configure()
    }
    
    private func configureProfileImageView() {
        self.view.addSubview(self.profileImageView)
        
        self.profileImageView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            self.profileImageView.widthAnchor.constraint(equalToConstant: profileImageViewSize.width),
            self.profileImageView.heightAnchor.constraint(equalToConstant: profileImageViewSize.height),
            self.profileImageView.topAnchor.constraint(equalTo: self.view.topAnchor, constant: 219.5),
            self.profileImageView.centerXAnchor.constraint(equalTo: self.view.centerXAnchor),
        ])
    }
    
    private func configureNameLabel() {
        self.view.addSubview(self.nameLabel)
        
        nameLabel.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            self.nameLabel.topAnchor.constraint(equalTo: profileImageView.bottomAnchor, constant: 30),
            self.nameLabel.centerXAnchor.constraint(equalTo: profileImageView.centerXAnchor)
        ])
    }
    
    private func configureSignOutButton() {
        let height = self.view.frame.height
        let padding = (60/height) * height
        let leadingBottomPadding: CGFloat = 50
        self.signOutButton.configure(text: "로그아웃", backgroundColor: UIColor(named: "orange"), target: self, action: #selector(signOutButtonTouched))

        self.view.addSubview(self.signOutButton)
        
        self.signOutButton.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            self.signOutButton.bottomAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.bottomAnchor, constant: -padding),
            self.signOutButton.centerXAnchor.constraint(equalTo: self.view.centerXAnchor),
            self.signOutButton.leadingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.leadingAnchor, constant: leadingBottomPadding),
            self.signOutButton.trailingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.trailingAnchor, constant: -leadingBottomPadding),
        ])
    }
    
    private func layoutNavigationBar() {
        self.view.addSubview(self.navigationBar)
        
        self.navigationBar.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            self.navigationBar.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            self.navigationBar.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
            self.navigationBar.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor),
        ])
    }
}
