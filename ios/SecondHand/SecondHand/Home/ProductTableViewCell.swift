//
//  ProductTableViewCell.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/13.
//

import UIKit

class ProductTableViewCell: UITableViewCell {
    static let identifier = "ProductTableViewCell"
    private let imageSizeRatio: CGFloat = 120/150 // 상품 이미지 크기 / 셀 높이
    private let centerPaddingRatio: CGFloat = 15/393 // 상품 이미지, 상품 내용 사이 간격 / width 비율
    
    private var productImageView = UIImageView()
    // 상품명, 동 이름, 몇 시간 전, 스택뷰(예약중 라벨 + 가격 라벨), 스택 뷰(좋아요 + 채팅 수)
    private let verticalStackView = UIStackView()
        private let productNameLabel = UILabel()
        private let townNameHoursAgoLabel = UILabel()
    
    // horizontalStackView 작성 예정
    // 예약중 라벨, 가격 라벨
    private let horizontalStackView = UIStackView()
        // reservationLabel 커스텀 라벨 작성 예정
        private let reservationLabel = UILabel()
        private let priceLabel = UILabel()
    // TODO: chattingAndLikedStackView 작성 예정
    private let chattingAndLikedStackView = UIStackView()
        // 커스텀 뷰(이미지 뷰 + 텍스트 라벨) 작성 예정
        // ...
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        self.addViews()
        self.setLayouts()
        self.configureStackViews()
        
        productImageView.backgroundColor = .gray
        verticalStackView.backgroundColor = .green
            productNameLabel.backgroundColor = .blue
            townNameHoursAgoLabel.backgroundColor = .orange
            productNameLabel.text = "productNameLabel"
            townNameHoursAgoLabel.text = "townNameHoursAgoLabel"
        
        productNameLabel.sizeToFit()
        townNameHoursAgoLabel.sizeToFit()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        self.addViews()
        self.setLayouts()
        self.configureStackViews()
    }
    
    func configure(productName: String, townName: String, hoursPast: String, image: UIImage? = nil) {
        self.productNameLabel.text = productName
        self.productImageView.image = image
        self.productImageView.image = image
    }
    
    private func addViews() {
        self.contentView.addSubview(self.productImageView)
        self.contentView.addSubview(self.verticalStackView)

        self.verticalStackView.addArrangedSubview(self.productNameLabel)
        self.verticalStackView.addArrangedSubview(self.townNameHoursAgoLabel)
        
//        self.contentView.addSubview(self.horizontalStackView)
//        // 커스텀 reservationLabel, priceLabel 스택 뷰에 추가
//
//        self.contentView.addSubview(self.chattingAndLikedStackView)
//        // 커스텀 뷰(이미지 뷰 + 텍스트 라벨) 스택 뷰에 추가
    }
    
    private func configureStackViews() {
        self.verticalStackView.axis = .vertical
        self.verticalStackView.alignment = .leading
        self.verticalStackView.distribution = .fillEqually
        
//        self.horizontalStackView.axis = .horizontal
    }

    func setLayouts() {
        self.productImageView.translatesAutoresizingMaskIntoConstraints = false
        self.verticalStackView.translatesAutoresizingMaskIntoConstraints = false
//        self.productNameLabel.translatesAutoresizingMaskIntoConstraints = false
//        self.townNameHoursAgoLabel.translatesAutoresizingMaskIntoConstraints = false
//        self.horizontalStackView.translatesAutoresizingMaskIntoConstraints = false
//        self.reservationLabel.translatesAutoresizingMaskIntoConstraints = false
//        self.priceLabel.translatesAutoresizingMaskIntoConstraints = false
//        self.chattingAndLikedStackView.translatesAutoresizingMaskIntoConstraints = false
        let imageViewPadding: CGFloat = 16.0
        let verticalStackViewPadding: CGFloat = 16.0
        
        NSLayoutConstraint.activate([
            self.productImageView.topAnchor.constraint(equalTo: self.contentView.topAnchor, constant: imageViewPadding),
            self.productImageView.bottomAnchor.constraint(equalTo: self.contentView.bottomAnchor, constant: -imageViewPadding),
            self.productImageView.leadingAnchor.constraint(equalTo: self.contentView.leadingAnchor, constant: imageViewPadding),
            self.productImageView.widthAnchor.constraint(equalTo: self.productImageView.heightAnchor),
            
            self.verticalStackView.topAnchor.constraint(equalTo: self.productImageView.topAnchor),
            self.verticalStackView.bottomAnchor.constraint(equalTo: self.productImageView.bottomAnchor),
            self.verticalStackView.leadingAnchor.constraint(equalTo: self.productImageView.trailingAnchor, constant: verticalStackViewPadding),
            self.verticalStackView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -verticalStackViewPadding),
        ])
    }
}
