//
//  SeparatorView.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/11.
//

import UIKit

class SeparatorView: UIView {
    static let height: CGFloat = 0.5
    static let interval: CGFloat = 5

    override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    func configure() {
        self.setColor()
    }
    
    private func setup() {
        self.setColor()
    }
    
    private func setColor() {
        self.backgroundColor = UIColor(named: "gray300")
    }
}
