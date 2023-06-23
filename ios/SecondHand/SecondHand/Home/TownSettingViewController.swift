//
//  TownSettingViewController.swift
//  SecondHand
//
//  Created by 김하림 on 2023/06/21.
//

import UIKit

class TownSettingViewController: UIViewController {
    private let separatorViewUnderNavigationBar: SeparatorView = SeparatorView()
    private let descriptionLabel: UILabel = {
        let descriptionLabel = UILabel()
        descriptionLabel.text = "지역은 최소 1개, \n 최대 2개까지 설정 가능해요"
        descriptionLabel.textAlignment = .center
        descriptionLabel.numberOfLines = 2
        return descriptionLabel
    }()
    private let button: UIButton = {
        let button = UIButton()
        button.setTitle("TEST", for: .normal)
        button.tintColor = .blue
        button.configuration = UIButton.Configuration.filled()
        return button
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        self.view.addSubview(separatorViewUnderNavigationBar)
        self.view.addSubview(descriptionLabel)
        self.view.addSubview(button)
        configureNavigationBar()
        configureSeparatorViewUnderNavigationBar()
        setDescriptionLabelLayout()
        setButtonLayout()
        button.addTarget(self, action: #selector(presentTownSearchView), for: .touchUpInside)
    }
    
    private func configureNavigationBar() {
        self.navigationItem.title = "동네 설정"
        self.navigationItem.leftBarButtonItem = UIBarButtonItem(title: "닫기", style: .plain, target: self, action: #selector(dismissButtonTouched))
    }
    */

    @objc func presentTownSearchView() {
        let townSearchViewController = TownSearchViewController()
        self.present(UINavigationController(rootViewController: townSearchViewController), animated: true)
        
    }
    
    private func configureSeparatorViewUnderNavigationBar() {
        self.separatorViewUnderNavigationBar.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            self.separatorViewUnderNavigationBar.topAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.topAnchor),
            self.separatorViewUnderNavigationBar.leadingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.leadingAnchor),
            self.separatorViewUnderNavigationBar.trailingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.trailingAnchor),
            self.separatorViewUnderNavigationBar.heightAnchor.constraint(equalToConstant: SeparatorView.height)
        ])
        self.separatorViewUnderNavigationBar.configure()
    }
    
    private func setDescriptionLabelLayout() {
        self.descriptionLabel.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            self.descriptionLabel.centerXAnchor.constraint(equalTo: self.view.centerXAnchor),
            self.descriptionLabel.topAnchor.constraint(equalTo: self.separatorViewUnderNavigationBar.bottomAnchor, constant: 50)
        ])
    }
    private func setButtonLayout() {
        self.button.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            self.button.centerXAnchor.constraint(equalTo: self.view.centerXAnchor),
            self.button.centerYAnchor.constraint(equalTo: self.view.centerYAnchor),
            self.button.widthAnchor.constraint(equalToConstant: 100),
            self.button.heightAnchor.constraint(equalToConstant: 100)
        ])
    }
    
}
