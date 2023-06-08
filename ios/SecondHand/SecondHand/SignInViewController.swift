//
//  SignInViewController.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/08.
//

import UIKit

class SignInViewController: UIViewController {
    let stackView: UIStackView = {
        let stack = UIStackView()
        stack.axis = .vertical
        return stack
    }()
    
    let idInputView: InputView = InputView()
    let loginButton: OrangeButton = OrangeButton()
    let signUpButton: UIButton = UIButton()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        self.configureNavigationBar()
        self.configureIdInputView()
        self.configureLoginSignUpButton()
    }
    
    private func configureNavigationBar() {
        self.navigationItem.title = "내 계정"
    }
    
    private func configureIdInputView() {
        self.view.addSubview(idInputView)
        idInputView.configureText(labelText: "아이디", textFieldPlaceholder: "아이디를 입력하세요.")
        
        self.idInputView.translatesAutoresizingMaskIntoConstraints = false
    }
    
    private func configureLoginSignUpButton() {
        self.loginButton.setTitle("로그인", for: .normal)
        self.signUpButton.setTitle("회원가입", for: .normal)
        
        self.signUpButton.setTitleColor(.black, for: .normal)
//        self.signUpButton.setAttributedTitle(<#T##title: NSAttributedString?##NSAttributedString?#>, for: <#T##UIControl.State#>)
        
        
        self.view.addSubview(self.stackView)
        
        self.stackView.addArrangedSubview(loginButton)
        self.stackView.addArrangedSubview(signUpButton)
        
        self.loginButton.translatesAutoresizingMaskIntoConstraints = false
        self.signUpButton.translatesAutoresizingMaskIntoConstraints = false
        self.stackView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            self.stackView.bottomAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.bottomAnchor, constant: -8),
            self.stackView.centerXAnchor.constraint(equalTo: self.view.centerXAnchor)
        ])
//        NSLayoutConstraint.activate([
//            self.signUpButton.widthAnchor.constraint(equalToConstant: 300),
//            self.signUpButton.heightAnchor.constraint(equalToConstant: 70),
//        ])
        
    }
    
    private func configureLoginButtonAction() {
        self.loginButton.addTarget(self, action: #selector(loginButtonAction), for: .touchUpInside)
    }
    
    @objc func loginButtonAction() {
        // 로그인 버튼 터치시 수행할 동작
    }
}

// TODO: 파일 분리 예정 - 1
class InputView: UIView {
    
    let horizontalStackView: UIStackView = {
        let uiStackView = UIStackView()
        uiStackView.axis = .horizontal
        uiStackView.spacing = 8
        uiStackView.alignment = .fill
        uiStackView.layoutMargins = UIEdgeInsets(top: 0, left: 8, bottom: 0, right: 8)
        uiStackView.isLayoutMarginsRelativeArrangement = true
        
        
        uiStackView.translatesAutoresizingMaskIntoConstraints = false
        return uiStackView
    }()
    
    let textLabel: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        label.textAlignment = .left
        return label
    }()
    
    let inputField: UITextField = {
        let textField = UITextField()
        textField.translatesAutoresizingMaskIntoConstraints = false
        
        return textField
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.setup()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        self.setup()
    }
    
    
    func configureText(labelText: String, textFieldPlaceholder: String) {
        self.textLabel.text = labelText
        self.inputField.placeholder = textFieldPlaceholder
    }
    
    private func setup() {
        self.configureLayout()
    }
    
    private func configureLayout() {
        self.addSubview(self.horizontalStackView)
        self.horizontalStackView.addArrangedSubview(textLabel)
        self.horizontalStackView.addArrangedSubview(inputField)

        NSLayoutConstraint.activate([
            textLabel.widthAnchor.constraint(equalToConstant: 100),
            horizontalStackView.topAnchor.constraint(equalTo: self.topAnchor),
            horizontalStackView.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            horizontalStackView.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            horizontalStackView.bottomAnchor.constraint(equalTo: self.bottomAnchor),
        ])
    }
}

// TODO: 파일 분리 예정 - 2
class OrangeButton: UIButton {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.setup()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        self.setup()
    }
    
    private func setup() {
        self.setColor()
        self.configureLayout()
        self.configureShape()
    }
    
    private func setColor() {
        self.backgroundColor = UIColor(named: "orange")
    }
    
    private func configureLayout() {
        self.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            self.widthAnchor.constraint(equalToConstant: 300),
            self.heightAnchor.constraint(equalToConstant: 70)
        ])
    }
    
    private func configureShape() {
        self.layer.cornerRadius = 10
    }
    
}
