//
//  ProfileImageView.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/12.
//

import UIKit.UIImageView

class ProfileImageView: UIImageView {
    override func layoutSubviews() {
        super.layoutSubviews()
        self.layer.cornerRadius = self.frame.size.height / 2
        self.clipsToBounds = true
    }
    
    func makePressable(target: UIViewController, action: Selector) {
        self.isUserInteractionEnabled = true
        let tapGesture = UITapGestureRecognizer(target: target, action: action)
        tapGesture.numberOfTapsRequired = 1
        self.addGestureRecognizer(tapGesture)
    }
}
