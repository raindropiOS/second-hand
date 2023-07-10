//
//  SignInViewController.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/08.
//

import UIKit

class SignInViewController: UIViewController {
    let networkManager: NetworkManageable
    let separatorViewUnderNavigationBar: SeparatorView = SeparatorView()
    let idInputView: InputView = InputView()
    let separatorView: SeparatorView = SeparatorView()
    private let topBottomPadding: CGFloat = 80/852
    
    let stackView: UIStackView = {
        let stack = UIStackView()
        stack.axis = .vertical
        return stack
    }()
    let loginButton: OrangeButton = OrangeButton()
    let signUpButton: UIButton = UIButton()
    
    init(networkManager: NetworkManageable) {
        self.networkManager = networkManager
        super.init()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        self.networkManager = NetworkManager()
        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        self.configureNavigationBar()
        self.configureSeparatorViewUnderNavigationBar()
        self.configureIdInputView()
        self.configureSeparatorView()
        self.configureLoginSignUpButton()
        
        self.signUpButton.addTarget(self, action: #selector(signUpButtonTouched), for: .touchUpInside)
    }
    
    private func configureLoginButtonAction() {
        self.loginButton.addTarget(self, action: #selector(loginButtonAction), for: .touchUpInside)
    }
    
    @objc func loginButtonAction() {
        self.networkManager.presentGithubOAuthLoginScreen()
    }
    
    @objc func signUpButtonTouched() {
        let signUpViewController = SignUpViewController()
        self.present(UINavigationController(rootViewController: signUpViewController), animated: true)
    }
    
    private func configureNavigationBar() {
        self.navigationItem.title = "내 계정"
    }
}

// MARK: Autolayout
extension SignInViewController {
    private func configureSeparatorViewUnderNavigationBar() {
        self.view.addSubview(separatorViewUnderNavigationBar)
        self.separatorViewUnderNavigationBar.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            self.separatorViewUnderNavigationBar.topAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.topAnchor),
        ])
        self.setSeparatorViewAdditionalAutolayout(separatorViewUnderNavigationBar)
        self.separatorViewUnderNavigationBar.configure()
    }
    
    private func configureIdInputView() {
        self.view.addSubview(idInputView)
        idInputView.configureText(labelText: "아이디", textFieldPlaceholder: "아이디를 입력하세요.")
        
        self.idInputView.translatesAutoresizingMaskIntoConstraints = false
        let height = self.view.frame.height
        let padding = self.topBottomPadding * height
        
        NSLayoutConstraint.activate([
            idInputView.topAnchor.constraint(equalTo: separatorViewUnderNavigationBar.bottomAnchor, constant: padding),
            idInputView.leadingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.leadingAnchor)
        ])
    }
    
    private func configureSeparatorView() {
        self.view.addSubview(separatorView)
        self.separatorView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            self.separatorView.topAnchor.constraint(equalTo: idInputView.bottomAnchor, constant: SeparatorView.interval),
        ])
        self.setSeparatorViewAdditionalAutolayout(separatorView)
        self.separatorView.configure()
    }
    
    private func configureLoginSignUpButton() {
        let height = self.view.frame.height
        let padding = self.topBottomPadding * height
        
        self.loginButton.setTitle("로그인", for: .normal)
        self.signUpButton.setTitle("회원가입", for: .normal)
        self.signUpButton.setTitleColor(.black, for: .normal)
        
        self.loginButton.addTarget(self, action: #selector(loginButtonAction), for: .touchUpInside)
        
        self.view.addSubview(self.stackView)
        
        self.stackView.addArrangedSubview(loginButton)
        self.stackView.addArrangedSubview(signUpButton)
        
        self.loginButton.translatesAutoresizingMaskIntoConstraints = false
        self.signUpButton.translatesAutoresizingMaskIntoConstraints = false
        self.stackView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            self.stackView.bottomAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.bottomAnchor, constant: -padding),
            self.stackView.centerXAnchor.constraint(equalTo: self.view.centerXAnchor)
        ])
    }
    
    // SeparatorView autolayout method
    private func setSeparatorViewAdditionalAutolayout(_ separatorView: SeparatorView) {
        NSLayoutConstraint.activate([
            separatorView.leadingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.leadingAnchor),
            separatorView.trailingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.trailingAnchor),
            separatorView.heightAnchor.constraint(equalToConstant: SeparatorView.height)
        ])
    }
}
