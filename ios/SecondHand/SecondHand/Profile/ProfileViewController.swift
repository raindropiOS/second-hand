//
//  ProfileViewController.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/08.
//

import UIKit

class ProfileViewController: UIViewController {
    let profileImageView = ProfileImageView()
    let nameLabel = UILabel()
    let signOutButton = OrangeButton()
    let profileImageViewSize: CGSize = CGSizeMake(100, 100)
    
    override func viewDidLoad() {
        self.configureProfileImageView()
        self.view.backgroundColor = .white
    }
    
    private func configureProfileImageView() {
        self.view.addSubview(profileImageView)
        profileImageView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            profileImageView.widthAnchor.constraint(equalToConstant: profileImageViewSize.width),
            profileImageView.heightAnchor.constraint(equalToConstant: profileImageViewSize.height),
            profileImageView.topAnchor.constraint(equalTo: self.view.topAnchor, constant: 219.5),
            profileImageView.centerXAnchor.constraint(equalTo: self.view.centerXAnchor),
        ])
    }
}
