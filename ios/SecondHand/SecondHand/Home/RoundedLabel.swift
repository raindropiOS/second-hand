//
//  RoundedLabel.swift
//  SecondHand
//
//  Created by 에디 on 2023/07/14.
//

import UIKit

/// 예약중 라벨
class RoundedLabel: UILabel {
    static let reservationLabel: RoundedLabel = {
        let label = RoundedLabel()
        if let mintColor = UIColor(named: "mint") {
            label.configure(text: "예약중", textColor: .white, backgroundColor: mintColor)
        }
        return label
    }()
    var edgeInset: UIEdgeInsets = .zero
    
    init() {
        super.init(frame: .zero)
        setup()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setup()
    }
    
    func configure(text: String, textColor: UIColor, backgroundColor: UIColor) {
        self.text = text
        self.textColor = textColor
        self.backgroundColor = backgroundColor
    }
    
    private func setup() {
        self.font = FontStyle.footnote
        makeSmallRoundShape()
        setTextPadding()
    }
    
    private func makeSmallRoundShape() {
        self.layer.masksToBounds = true
        self.layer.cornerRadius = 8
    }
    
    private func setTextPadding() {
        self.edgeInset = UIEdgeInsets(top: 3, left: 8, bottom: 3, right: 8)
    }
    
    override func drawText(in rect: CGRect) {
        let insets = UIEdgeInsets.init(top: edgeInset.top, left: edgeInset.left, bottom: edgeInset.bottom, right: edgeInset.right)
        super.drawText(in: rect.inset(by: insets))
    }
    
    override var intrinsicContentSize: CGSize {
        let size = super.intrinsicContentSize
        return CGSize(width: size.width + edgeInset.left + edgeInset.right, height: size.height + edgeInset.top + edgeInset.bottom)
    }
}
