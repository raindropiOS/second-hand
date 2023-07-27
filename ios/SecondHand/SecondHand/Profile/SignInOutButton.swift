//
//  NewSignInButton.swift
//  SecondHand
//
//  Created by 에디 on 2023/07/27.
//

import UIKit

class SignInOutButton: UIView {
    private let label: UILabel = .init()
    private let topBottomInset: CGFloat = 15.0
    private let leadingTrailingInset: CGFloat = 50
    private let imageLabelPadding: CGFloat = 10
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.commonInit()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        self.commonInit()
    }
    
    func configure(text: String, backgroundColor: UIColor?, target: UIViewController, action: Selector) {
        self.commonInit()
        self.makePressable(target: target, action: action)
        
        self.label.text = text
        self.backgroundColor = backgroundColor
    }
    
    private func commonInit() {
        self.addSubview(self.label)
        
        self.constraintSubviews()
        
        self.label.textColor = .white
        self.label.textAlignment = .center
        //        self.label.font = FontStyle.headline
    }
    
    private func constraintSubviews() {
        self.label.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            self.label.topAnchor.constraint(equalTo: self.topAnchor, constant: self.topBottomInset),
            self.label.bottomAnchor.constraint(equalTo: self.bottomAnchor, constant: -self.topBottomInset),
            self.label.leadingAnchor.constraint(equalTo: self.leadingAnchor, constant: self.leadingTrailingInset),
            self.label.trailingAnchor.constraint(equalTo: self.trailingAnchor, constant: -self.leadingTrailingInset)
        ])
    }
    
    private func makeRoundedBounds() {
        self.layer.borderColor = .init(red: 1, green: 1, blue: 1, alpha: 1.0)
        self.layer.borderWidth = 1.0
        self.layer.cornerRadius = self.bounds.height * (1 / 4)
        self.layer.masksToBounds = true
    }
    
    private func makePressable(target: UIViewController, action: Selector) {
        self.isUserInteractionEnabled = true
        let tapGesture = UITapGestureRecognizer(target: target, action: action)
        tapGesture.numberOfTapsRequired = 1
        self.addGestureRecognizer(tapGesture)
    }
    
    @objc func viewIsOnPressing(gesture: UITapGestureRecognizer) {
        if gesture.state == .began {
            self.label.alpha = 0.5
        }
        
        if gesture.state == .ended {
            self.label.alpha = 1.0
        }
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        self.makeRoundedBounds()
    }
}

// 애니메이션
extension SignInOutButton {
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        DispatchQueue.main.async {
            self.alpha = 1.0
            UIView.animate(withDuration: 0.5, animations: {
                self.alpha = 0.5
            }, completion: nil)
        }
    }
    
    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        DispatchQueue.main.async {
            self.alpha = 0.5
            UIView.animate(withDuration: 0.5, animations: {
                self.alpha = 1.0
            }, completion: nil)
        }
    }
    
    override func touchesCancelled(_ touches: Set<UITouch>, with event: UIEvent?) {
        DispatchQueue.main.async {
            self.alpha = 0.5
            UIView.animate(withDuration: 0.5, animations: {
                self.alpha = 1.0
            }, completion: nil)
        }
    }
}
