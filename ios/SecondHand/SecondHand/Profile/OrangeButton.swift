//
//  OrangeButton.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/11.
//

import UIKit

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
            self.widthAnchor.constraint(equalToConstant: 330),
            self.heightAnchor.constraint(equalToConstant: 40)
        ])
    }
    
    private func configureShape() {
        self.layer.cornerRadius = 10
    }
    
}
