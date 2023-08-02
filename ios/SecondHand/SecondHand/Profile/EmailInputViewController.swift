//
//  EmailInputViewController.swift
//  SecondHand
//
//  Created by 에디 on 2023/07/18.
//

import UIKit

class EmailInputViewController: UIViewController, UITextFieldDelegate {
    var coordinator: ProfileCoordinator?
    private let networkManager: NetworkManageable
    private let keychainManager: KeychainManageable
    private lazy var topBottomPadding: CGFloat = self.view.frame.height * 80/852
    private let separatorViewUnderNavigationBar: SeparatorView = SeparatorView()
    private let emailInputView: InputView = {
       let inputView = InputView()
        
        return inputView
    }()
    private let signUpButton: SignInOutButton = {
        let button = SignInOutButton()
        return button
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        
        self.configureSeparatorViewUnderNavigationBar()
        self.configureIdInputView()
        self.configureSignUpButton()
        
        self.emailInputView.inputField.delegate = self
    }
    
    init(networkManager: NetworkManageable, keychainManager: KeychainManageable) {
        self.networkManager = networkManager
        self.keychainManager = keychainManager
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
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
        let height = self.view.frame.height
        let padding = (60/height) * height
        let leadingBottomPadding: CGFloat = 50
        
        self.view.addSubview(self.signUpButton)
        self.signUpButton.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            self.signUpButton.bottomAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.bottomAnchor, constant: -padding),
            self.signUpButton.centerXAnchor.constraint(equalTo: self.view.centerXAnchor),
            self.signUpButton.leadingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.leadingAnchor, constant: leadingBottomPadding),
            self.signUpButton.trailingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.trailingAnchor, constant: -leadingBottomPadding),
        ])
        
        self.signUpButton.configure(text: "이메일 입력 완료", backgroundColor: UIColor(named: "orange"), target: self, action: #selector(signUpButtonTouched))
    }
    
    @objc func signUpButtonTouched() {
        let email = self.emailInputView.inputText
        if let temporarySavedjwt = self.keychainManager.temporarySavedJwt {
            Task {
                do {
                    let dataTuple = try await self.networkManager.sendEmail(email, jwtAccessToken: temporarySavedjwt.refreshToken)
                    // 이메일 전달 후 새로 받은 유저 정보 및 JWT
                    let jwt = dataTuple.1
                    
                    try await self.keychainManager.deleteJsonWebToken()
                    try await self.keychainManager.addJsonWebToken(jwt, email: email)
                    UserManager.shared.isSignedIn = true
                } catch {
                    print("error: \(error)")
                }
            }
        }
        self.navigationController?.popViewController(animated: true)
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
}
