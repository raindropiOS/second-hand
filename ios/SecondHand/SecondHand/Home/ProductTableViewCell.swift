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
    
    private let spacing = UIView() // 빈 공간을 위한 뷰
    
    // reservationLabel 커스텀 라벨 작성 예정
    private let reservationLabel = RoundedLabel.reservationLabel
    private let priceLabel: UILabel = {
        let label = UILabel()
        label.text = "24,500원"
        label.font = FontStyle.headline
        return label
    }()
    // TODO: chattingAndLikedStackView 작성 예정
    private let chattingAndLikedStackView = UIStackView()
    private let likedCountView: ImageLabelStackView = {
        let stack = ImageLabelStackView()
        if let chatImage = UIImage(systemName: "message") {
            stack.configure(image: chatImage, text: "1")
        }
        return stack
    }()
    private let chattingCountView: ImageLabelStackView = {
        let stack = ImageLabelStackView()
        if let heartImage = UIImage(systemName: "heart") {
            stack.configure(image: heartImage, text: "2")
        }
        return stack
    }()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        self.setup()
        productImageView.backgroundColor = .gray
        verticalStackView.backgroundColor = .green
        productNameLabel.backgroundColor = .blue
        townNameHoursAgoLabel.backgroundColor = .orange
        horizontalStackView.backgroundColor = .red
        productNameLabel.text = "productNameLabel"
        townNameHoursAgoLabel.text = "townNameHoursAgoLabel"
        
        productNameLabel.sizeToFit()
        townNameHoursAgoLabel.sizeToFit()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        self.setup()
    }
    
    func configure(productName: String, townName: String, hoursPast: String, image: UIImage? = nil) {
        self.productNameLabel.text = productName
        self.productImageView.image = image
        self.productImageView.image = image
    }
    
    func toggleReservationLabel() {
        self.reservationLabel.isHidden.toggle()
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
        self.verticalStackView.addArrangedSubview(self.horizontalStackView)
        self.verticalStackView.addArrangedSubview(self.spacing)
        self.verticalStackView.addArrangedSubview(self.chattingAndLikedStackView)
        
//        self.verticalStackView.addArrangedSubview()
        
        //                 커스텀 reservationLabel, priceLabel 스택 뷰에 추가
        self.horizontalStackView.addArrangedSubview(self.reservationLabel)
        self.horizontalStackView.addArrangedSubview(self.priceLabel)
        
//        self.contentView.addSubview(self.chattingAndLikedStackView)
        self.chattingAndLikedStackView.addArrangedSubview(likedCountView)
        self.chattingAndLikedStackView.addArrangedSubview(chattingCountView)
    }
    
    private func configureStackViews() {
        self.verticalStackView.axis = .vertical
        self.verticalStackView.alignment = .leading
        self.verticalStackView.distribution = .fillEqually
        
        self.horizontalStackView.axis = .horizontal
        self.horizontalStackView.spacing = 4
        
        self.chattingAndLikedStackView.axis = .horizontal
        self.chattingAndLikedStackView.alignment = .trailing
        self.chattingAndLikedStackView.spacing = 5
    }
    
    func setLayouts() {
        self.productImageView.translatesAutoresizingMaskIntoConstraints = false
        self.verticalStackView.translatesAutoresizingMaskIntoConstraints = false
        self.spacing.translatesAutoresizingMaskIntoConstraints = false

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
            
            self.spacing.heightAnchor.constraint(equalToConstant: self.horizontalStackView.frame.height)
        ])
    }
}

// TODO: 파일 분리 예정 - 1
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
        makeRoundShape()
        setTextPadding()
    }
    
    private func makeRoundShape() {
        let width: CGFloat = 50.0
        let height: CGFloat = 22.0
        
        self.frame.size.width = width
        self.frame.size.height = height
        
        self.clipsToBounds = true
        self.layer.cornerRadius = height / 2
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
