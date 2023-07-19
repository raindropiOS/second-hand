//
//  EmailInputViewController.swift
//  SecondHand
//
//  Created by 에디 on 2023/07/18.
//

import UIKit

class EmailInputViewController: UIViewController {
    private let networkManager: NetworkManageable
    private let keychainManager: KeychainManageable
    private lazy var topBottomPadding: CGFloat = self.view.frame.height * 80/852
    private let separatorViewUnderNavigationBar: SeparatorView = SeparatorView()
    private let emailInputView: InputView = {
       let inputView = InputView()
        
        return inputView
    }()
    private let signUpButton: UIButton = {
        let button = UIButton()
        button.setTitle("회원가입 완료", for: .normal)
        button.backgroundColor = .orange
        return button
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        
        self.configureSeparatorViewUnderNavigationBar()
        self.configureIdInputView()
        self.configureSignUpButton()
    }
    
    init(networkManager: NetworkManageable, keychainManager: KeychainManageable) {
        self.networkManager = networkManager
        self.keychainManager = keychainManager
        super.init()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        self.networkManager = NetworkManager()
        self.keychainManager = KeychainManager()
        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
    }
    
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
    
    private func configureIdInputView() {
        self.view.addSubview(self.emailInputView)
        emailInputView.configureText(labelText: "이메일", textFieldPlaceholder: "이메일을 입력하세요.")
        
        self.emailInputView.translatesAutoresizingMaskIntoConstraints = false
        let padding = self.topBottomPadding
        
        NSLayoutConstraint.activate([
            emailInputView.topAnchor.constraint(equalTo: separatorViewUnderNavigationBar.bottomAnchor, constant: padding),
            emailInputView.leadingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.leadingAnchor)
        ])
    }
    
    private func configureSignUpButton() {
        self.view.addSubview(self.signUpButton)
        self.signUpButton.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            self.signUpButton.widthAnchor.constraint(equalToConstant: 330),
            self.signUpButton.heightAnchor.constraint(equalToConstant: 40),
            self.signUpButton.centerXAnchor.constraint(equalTo: self.view.centerXAnchor),
            self.signUpButton.bottomAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.bottomAnchor, constant: -self.topBottomPadding)
        ])
        
        self.signUpButton.addTarget(self, action: #selector(signUpButtonTouched), for: .touchUpInside)
    }
    
    @objc func signUpButtonTouched() {
        let email = self.emailInputView.inputText
        
        Task { [weak self] in
            if let jwt = self?.keychainManager.temporarySavedJwt?.token.components(separatedBy: ".") {
                let accessToken = jwt[0]
                self?.networkManager.sendEmail(email, jwtAccessToken: accessToken)
            }
        }
        
//        DispatchQueue.global().async { [weak self] in
//            if let networkManager = self?.networkManager {
//                networkManager.sendEmail(email)
//            }
//        }
        
        self.navigationController?.popViewController(animated: true)
    }
}
