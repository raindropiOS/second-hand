//
//  SignUpViewController.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/08.
//

import UIKit

class SignUpViewController: UIViewController {
    private let buttonContentInsets: NSDirectionalEdgeInsets = NSDirectionalEdgeInsets(top: 16, leading: 10, bottom: 16, trailing: 10)
    private let circleButtonContentInsets: NSDirectionalEdgeInsets = NSDirectionalEdgeInsets(top: 25.5, leading: 20.5, bottom: 25.5, trailing: 20.5)
    private let separatorView: SeparatorView = SeparatorView()
    private let separatorViewUnderNavigationBar: SeparatorView = SeparatorView()
    private let idInputView: InputView = InputView()
    private let button: UIButton = {
        let button = UIButton(type: .system)
        let symbolConfig = UIImage.SymbolConfiguration(pointSize: 16, weight: .regular)
        let symbolImage = UIImage(systemName: "plus", withConfiguration: symbolConfig)
        button.setImage(symbolImage, for: .normal)
        button.setTitle("위치 추가", for: .normal)
        return button
    }()
    
    private let circleButton: UIButton = {
        let circleButton = UIButton(type: .custom)
        let symbolConfig = UIImage.SymbolConfiguration(pointSize: 24, weight: .regular)
        let symbolImage = UIImage(systemName: "camera", withConfiguration: symbolConfig)
        circleButton.frame = CGRect(x: 0, y: 0, width: 80, height: 80)
        circleButton.setImage(symbolImage, for: .normal)
        return circleButton
    }()
    
    private func setButtonUI(button: UIButton, cornerRadius: CGFloat) {
        button.tintColor = .white
        button.layer.borderWidth = 1
        button.layer.borderColor = UIColor(red: 0.702, green: 0.702, blue: 0.702, alpha: 0.39).cgColor
        button.clipsToBounds = true
        button.layer.cornerRadius = cornerRadius
    }
    
    private func setButtonPadding(button: UIButton, contentInsets: NSDirectionalEdgeInsets) {
        var config = UIButton.Configuration.filled()
        config.contentInsets = contentInsets
        config.imagePadding = 4
        button.configuration = config
    }
    
    private func configureNavigationBar() {
        self.navigationItem.title = "회원가입"
        self.navigationItem.leftBarButtonItem = UIBarButtonItem(title: "닫기", style: .plain, target: self, action: #selector(dismissButtonTouched))
        self.navigationItem.rightBarButtonItem = UIBarButtonItem(title: "완료", style: .done, target: self, action: #selector(finishButtonTouched))
    }
    
    @objc func dismissButtonTouched() {
        self.dismiss(animated: true, completion: nil)
    }
    
    @objc func finishButtonTouched() {
        // 완료 버튼 누르면 발생할 로직
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
    
    private func configureIdInputView() {
        idInputView.configureText(labelText: "아이디", textFieldPlaceholder: "아이디를 입력하세요.")
        
        self.idInputView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            idInputView.bottomAnchor.constraint(equalTo: button.topAnchor, constant: -40),
            idInputView.leadingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.leadingAnchor)
        ])
    }
    
    private func configureSeparatorView() {
        self.separatorView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            self.separatorView.topAnchor.constraint(equalTo: idInputView.bottomAnchor, constant: SeparatorView.interval),
            self.separatorView.leadingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.leadingAnchor),
            self.separatorView.trailingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.trailingAnchor),
            self.separatorView.heightAnchor.constraint(equalToConstant: SeparatorView.height)
        ])
        self.separatorView.configure()
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        view.addSubview(button)
                NSLayoutConstraint.activate([
                    button.centerXAnchor.constraint(equalTo: view.centerXAnchor),
                    button.trailingAnchor.constraint(equalTo: super.view.trailingAnchor, constant: -16),
                    button.topAnchor.constraint(equalTo: super.view.topAnchor, constant: 382)
                ])
        view.addSubview(circleButton)
                NSLayoutConstraint.activate([
                    circleButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
                    circleButton.topAnchor.constraint(equalTo: super.view.topAnchor, constant: 219.5)
                ])
        self.view.addSubview(separatorView)
        configureSeparatorViewUnderNavigationBar()
        configureIdInputView()
        configureSeparatorView()
    }
    

}
