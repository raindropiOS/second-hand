//
//  ProfileViewController.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/08.
//

import UIKit

class ProfileViewController: UIViewController {
    var coordinator: ProfileCoordinator?
    let profileImageView = ProfileImageView()
    let nameLabel = UILabel()
    let signOutButton = OrangeButton()
    let profileImageViewSize: CGSize = CGSize(width: 100, height: 100)
    
    override func viewDidLoad() {
        self.navigationItem.title = "내 계정"
        self.view.backgroundColor = .white
        self.configureProfileImageView()
        self.configureNameLabel()
        self.configureSignOutButton()
    }
    
    private func setName(_ name: String) {
        self.nameLabel.text = name
    }
    
    private func setImage(_ uiImage: UIImage) {
        self.profileImageView.image = uiImage
    }
}

// MARK: Autolayout
extension ProfileViewController {
  
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
        self.signOutButton.setTitle("로그아웃", for: .normal)

        self.view.addSubview(self.signOutButton)
        
        self.signOutButton.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            self.signOutButton.bottomAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.bottomAnchor, constant: -padding),
            self.signOutButton.centerXAnchor.constraint(equalTo: self.view.centerXAnchor)
        ])
    }
}
