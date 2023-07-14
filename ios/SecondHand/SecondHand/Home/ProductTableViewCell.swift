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
    
    private var productImageView: UIImageView = {
        let imageView = UIImageView()
        imageView.layer.cornerRadius = 8
        imageView.clipsToBounds = true
        return imageView
    }()
    // 상품명, 동 이름, 몇 시간 전, 스택뷰(예약중 라벨 + 가격 라벨), 스택 뷰(좋아요 + 채팅 수)
    private let verticalStackView = UIStackView()
    private let productNameLabel = UILabel()
    private let townNameHoursAgoLabel = UILabel()
    private let cellInsetPadding: CGFloat = 16.0
    
    // horizontalStackView 작성 예정
    // 예약중 라벨, 가격 라벨
    private let reservationPriceStack = UIStackView()
    
    private let spacing = UIView() // 빈 공간을 위한 뷰
    
    // reservationLabel 커스텀 라벨 작성 예정
    private let reservationLabel = RoundedLabel.reservationLabel
    private let priceLabel: UILabel = {
        let label = UILabel()
        label.text = "24,500원"
        label.font = FontStyle.headline
        return label
    }()
    
    private let chattingAndLikedStackView = UIStackView()
    private let likedCountView: ImageLabelStackView = {
        let stack = ImageLabelStackView()
        if let chatImage = UIImage(systemName: "message") {
            let color = UIColor(named: "gray400") ?? .black
            let coloredImage = chatImage.withTintColor(color, renderingMode: .alwaysOriginal)
            stack.configure(image: coloredImage, text: "1")
        }
        return stack
    }()
    private let chattingCountView: ImageLabelStackView = {
        let stack = ImageLabelStackView()
        
        if let heartImage = UIImage(systemName: "heart") {
            let color = UIColor(named: "gray400") ?? .black
            let coloredImage = heartImage.withTintColor(color, renderingMode: .alwaysOriginal)
            stack.configure(image: coloredImage, text: "2")
        }
        return stack
    }()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        self.setup()
        productImageView.image = UIImage(named: "FanImage")
        
        productNameLabel.text = "파랑 선풍기"
        productNameLabel.font = FontStyle.subhead
        
        townNameHoursAgoLabel.text = "역삼1동 · 2시간 전"
        townNameHoursAgoLabel.font = FontStyle.footnote
        townNameHoursAgoLabel.textColor = UIColor(named: "gray300")
        
        productNameLabel.sizeToFit()
        townNameHoursAgoLabel.sizeToFit()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        self.setup()
    }
    
    func configure(_ productViewModel: ProductCellRepresentable) {
        if let imageKey = productViewModel.imageKey {
            self.productImageView.loadImage(imageKey)
        }
        self.productNameLabel.text = productViewModel.name
        self.townNameHoursAgoLabel.text = productViewModel.townNameHoursAgo
        self.reservationLabel.isHidden = productViewModel.isReserved
        self.priceLabel.text = productViewModel.price
        self.chattingCountView.setText(with: productViewModel.chatCount)
        self.likedCountView.setText(with: productViewModel.likedCount)
    }
    
    private func setup() {
        self.addViews()
        self.setLayouts()
        self.configureStackViews()
    }
    
    private func addViews() {
        self.contentView.addSubview(self.productImageView)
        self.contentView.addSubview(self.verticalStackView)
        
        self.verticalStackView.addArrangedSubview(self.productNameLabel)
        self.verticalStackView.addArrangedSubview(self.townNameHoursAgoLabel)
        self.verticalStackView.addArrangedSubview(self.reservationPriceStack)
        self.verticalStackView.addArrangedSubview(self.spacing)
        self.verticalStackView.addArrangedSubview(self.chattingAndLikedStackView)
        
        self.reservationPriceStack.addArrangedSubview(self.reservationLabel)
        self.reservationPriceStack.addArrangedSubview(self.priceLabel)
        
        self.chattingAndLikedStackView.addArrangedSubview(UIView())
        self.chattingAndLikedStackView.addArrangedSubview(likedCountView)
        self.chattingAndLikedStackView.addArrangedSubview(chattingCountView)
    }
    
    private func configureStackViews() {
        self.verticalStackView.axis = .vertical
        self.verticalStackView.alignment = .leading
        self.verticalStackView.distribution = .fillProportionally
        
        self.reservationPriceStack.axis = .horizontal
        self.reservationPriceStack.spacing = 4
        
        self.chattingAndLikedStackView.axis = .horizontal
        self.chattingAndLikedStackView.spacing = 5
    }
    
    func setLayouts() {
        self.productImageView.translatesAutoresizingMaskIntoConstraints = false
        self.verticalStackView.translatesAutoresizingMaskIntoConstraints = false
        self.spacing.translatesAutoresizingMaskIntoConstraints = false
        self.chattingAndLikedStackView.translatesAutoresizingMaskIntoConstraints = false

        let verticalStackViewPadding: CGFloat = 16.0
        
        NSLayoutConstraint.activate([
            self.productImageView.topAnchor.constraint(equalTo: self.contentView.topAnchor, constant: cellInsetPadding),
            self.productImageView.bottomAnchor.constraint(equalTo: self.contentView.bottomAnchor, constant: -cellInsetPadding),
            self.productImageView.leadingAnchor.constraint(equalTo: self.contentView.leadingAnchor, constant: cellInsetPadding),
            self.productImageView.widthAnchor.constraint(equalTo: self.productImageView.heightAnchor),
            
            self.verticalStackView.topAnchor.constraint(equalTo: self.contentView.topAnchor, constant: self.cellInsetPadding),
            self.verticalStackView.bottomAnchor.constraint(equalTo: self.contentView.bottomAnchor, constant: -self.cellInsetPadding),
            self.verticalStackView.leadingAnchor.constraint(equalTo: self.productImageView.trailingAnchor, constant: verticalStackViewPadding),
            self.verticalStackView.trailingAnchor.constraint(equalTo: self.contentView.trailingAnchor, constant: -verticalStackViewPadding),
            
            self.spacing.heightAnchor.constraint(equalToConstant: self.reservationPriceStack.frame.height),
            
            self.chattingAndLikedStackView.trailingAnchor.constraint(equalTo: self.verticalStackView.trailingAnchor)
        ])
    }
}

protocol ProductCellRepresentable {
    var imageKey: String? { get }
    var name: String { get }
    var townNameHoursAgo: String { get }
    var isReserved: Bool { get }
    var price: String { get }
    var chatCount: String { get }
    var likedCount: String { get }
}
