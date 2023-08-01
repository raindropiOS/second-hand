//
//  InputView.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/11.
//

import UIKit

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
    
    var inputText: String {
        self.inputField.text ?? ""
    }
    
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
