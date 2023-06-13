//
//  ProductTableViewCell.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/13.
//

import UIKit

class ProductTableViewCell: UITableViewCell {
    static let identifier = "ProductTableViewCell"
    private let imageSizeRatio: CGFloat = 120/361
    
    let productImageView = UIImageView()
    let productNameLabel = UILabel()
    let townNameLabel = UILabel()
    let hoursAgoLabel = UILabel()
    
    private func configure() {
        
    }
    
    private func configureLayouts() {
        self.contentView.addSubview(productImageView)
        self.contentView.addSubview(productNameLabel)
        self.contentView.addSubview(townNameLabel)
        self.contentView.addSubview(hoursAgoLabel)
        
        self.productImageView.translatesAutoresizingMaskIntoConstraints = false
        self.productNameLabel.translatesAutoresizingMaskIntoConstraints = false
        self.townNameLabel.translatesAutoresizingMaskIntoConstraints = false
        self.hoursAgoLabel.translatesAutoresizingMaskIntoConstraints = false
        
        guard let superview = superview else { return }
        let imageViewLength = superview.frame.height * imageSizeRatio
        
        NSLayoutConstraint.activate([
            self.productImageView.topAnchor.constraint(equalTo: self.contentView.topAnchor),
            self.productImageView.leadingAnchor.constraint(equalTo: self.contentView.leadingAnchor),
            self.productImageView.widthAnchor.constraint(equalToConstant: imageViewLength),
            self.productImageView.heightAnchor.constraint(equalToConstant: imageViewLength)
        ])
    }
}
