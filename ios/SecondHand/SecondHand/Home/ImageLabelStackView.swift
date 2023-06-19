//
//  ImageLabelStackView.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/17.
//

import UIKit
/// 좋아요 또는 채팅 수를 표시하기 위한 HStackView
class ImageLabelStackView: UIStackView {
    private let imageView = UIImageView()
    private let label = UILabel()
    private let spacingValue = 5.0
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }
    
    required init(coder: NSCoder) {
        super.init(coder: coder)
        setup()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        setup()
    }
    
    func configure(image: UIImage, text: String) {
        self.imageView.image = image
        self.label.text = text
    }
    
    private func setup() {
        self.addViews()
        self.spacing = spacingValue
    }
    
    private func addViews() {
        self.addArrangedSubview(self.imageView)
        self.addArrangedSubview(self.label)
    }
}
