//
//  ChattingListTableViewCell.swift
//  SecondHand
//
//  Created by 에디 on 2023/08/07.
//

import UIKit

class ChattingListTableViewCell: UITableViewCell {
    static let identifier = "ChattingListTableViewCell"
    
    private let userImageView: ProfileImageView = {
        let imageView = ProfileImageView()
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    private let userNameLabel: UILabel = {
        let label = UILabel()
        label.font = FontStyle.title3
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private let timePastLabel: UILabel = {
        let label = UILabel()
        label.font = FontStyle.footnote
        label.textColor = UIColor(named: "gray300")
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private let lastChatMessageLabel: UILabel = {
        let label = UILabel()
        label.font = FontStyle.body
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private let productImageView: UIImageView = {
        let imageView = UIImageView()
        imageView.layer.cornerRadius = 8
        imageView.clipsToBounds = true
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        self.configureViews()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(_ viewModel: ChattingListTableViewCellViewModel) {
        self.userImageView.loadImage(viewModel.userImageUrl)
        self.userNameLabel.text = viewModel.userName
        self.timePastLabel.text = viewModel.timePast
        self.lastChatMessageLabel.text = viewModel.lastChatMessage
        self.productImageView.loadImage(viewModel.productImageUrl)
    }
    
    private func configureViews() {
        let spacing: CGFloat = 10.0
        
        let horizontalStackView: UIStackView = {
            let stackView = UIStackView()
            stackView.translatesAutoresizingMaskIntoConstraints = false
            stackView.axis = .horizontal
            stackView.spacing = 5.0
            
            stackView.addArrangedSubview(self.userNameLabel)
            stackView.addArrangedSubview(self.timePastLabel)
            stackView.addArrangedSubview(UIView())
            return stackView
        }()
        
        let centerView: UIStackView = {
            let stackView = UIStackView()
            stackView.translatesAutoresizingMaskIntoConstraints = false
            stackView.axis = .vertical
            stackView.spacing = spacing
            stackView.distribution = .fillProportionally
            
            stackView.addArrangedSubview(horizontalStackView)
            stackView.addArrangedSubview(self.lastChatMessageLabel)
            return stackView
        }()
        
        self.contentView.addSubview(self.userImageView)
        self.contentView.addSubview(centerView)
        self.contentView.addSubview(self.productImageView)
        
        let padding: CGFloat = 5.0
        NSLayoutConstraint.activate([
            self.userImageView.topAnchor.constraint(equalTo: self.contentView.topAnchor, constant: spacing),
            self.userImageView.bottomAnchor.constraint(equalTo: self.contentView.bottomAnchor, constant: -spacing),
            self.userImageView.leadingAnchor.constraint(equalTo: self.contentView.leadingAnchor, constant: spacing),
            self.userImageView.widthAnchor.constraint(equalTo: self.userImageView.heightAnchor),
            
            centerView.topAnchor.constraint(equalTo: contentView.topAnchor, constant: padding),
            centerView.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -padding),
            centerView.leadingAnchor.constraint(equalTo: self.userImageView.trailingAnchor, constant: padding),
            centerView.trailingAnchor.constraint(equalTo: self.contentView.trailingAnchor, constant: -padding),
            
            self.productImageView.topAnchor.constraint(equalTo: self.contentView.topAnchor, constant: spacing),
            self.productImageView.bottomAnchor.constraint(equalTo: self.contentView.bottomAnchor, constant: -spacing),
            self.productImageView.trailingAnchor.constraint(equalTo: self.contentView.trailingAnchor, constant: -spacing),
            self.productImageView.widthAnchor.constraint(equalTo: self.productImageView.heightAnchor),
        ])
    }
}
