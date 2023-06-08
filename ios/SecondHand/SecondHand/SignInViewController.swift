//
//  SignInViewController.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/08.
//

import UIKit

class SignInViewController: UIViewController {
    let idInputView: InputView = InputView()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        self.configureNavigationBar()
        self.configureIdInputView()
    }
    
    private func configureNavigationBar() {
        self.navigationItem.title = "내 계정"
    }
    
    private func configureIdInputView() {
        self.view.addSubview(idInputView)
        idInputView.configureText(labelText: "아이디", textFieldPlaceholder: "아이디를 입력하세요.")
        
        self.idInputView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            self.idInputView.topAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.topAnchor),
            self.idInputView.leadingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.leadingAnchor),
            self.idInputView.trailingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.trailingAnchor),
//            self.idInputView.widthAnchor.constraint(equalToConstant: 200),
            self.idInputView.heightAnchor.constraint(equalToConstant: 50)
        ])
    }
}

// TODO: 파일 분리 예정
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
