//
//  ImageLabelStackView.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/17.
//

import UIKit
/// 좋아요 또는 채팅 수를 표시하기 위한 HStackView
class ImageLabelStackView: UIStackView {
    let imageView = UIImageView()
    let label = UILabel()
    
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
        self.setLayout()
    }
    
    private func addViews() {
        self.addArrangedSubview(self.imageView)
        self.addArrangedSubview(self.label)
    }
    
    private func setLayout() {
        self.imageView.translatesAutoresizingMaskIntoConstraints = false
        self.label.translatesAutoresizingMaskIntoConstraints = false
        let size = CGSize(width: 24, height: 20)
        
        NSLayoutConstraint.activate([
            self.imageView.centerYAnchor.constraint(equalTo: self.centerYAnchor),
            self.imageView.widthAnchor.constraint(equalToConstant: size.width),
            self.imageView.heightAnchor.constraint(equalToConstant: size.height),
            
            self.label.topAnchor.constraint(equalTo: self.topAnchor),
            self.label.bottomAnchor.constraint(equalTo: self.bottomAnchor),
            self.label.leadingAnchor.constraint(equalTo: self.imageView.trailingAnchor),
            self.label.trailingAnchor.constraint(equalTo: self.trailingAnchor)
        ])
    }
}
