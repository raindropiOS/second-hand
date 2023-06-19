//
//  FontStyle.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/07.
//

import UIKit.UIFont

struct FontStyle {
    let size: CGFloat
    let weight: UIFont.Weight
    let width: UIFont.Width
    
    static let largeTitle = UIFont.systemFont(ofSize: 34, weight: .regular, width: .standard)
    static let title1 = UIFont.systemFont(ofSize: 28, weight: .regular, width: .standard)
    static let title2 = UIFont.systemFont(ofSize: 22, weight: .regular, width: .standard)
    static let title3 = UIFont.systemFont(ofSize: 20, weight: .regular, width: .standard)
    static let headline = UIFont.systemFont(ofSize: 17, weight: .semibold, width: .standard)
    static let body = UIFont.systemFont(ofSize: 17, weight: .regular, width: .standard)
    static let callout = UIFont.systemFont(ofSize: 17, weight: .regular, width: .standard)
    static let subhead = UIFont.systemFont(ofSize: 16, weight: .regular, width: .standard)
    static let footnote = UIFont.systemFont(ofSize: 15, weight: .regular, width: .standard)
    static let caption1 = UIFont.systemFont(ofSize: 13, weight: .regular, width: .standard)
    static let caption2 = UIFont.systemFont(ofSize: 12, weight: .regular, width: .standard)
}

extension UIFont {
    static func customFont(_ fontStyle: FontStyle) -> UIFont {
        UIFont.systemFont(ofSize: fontStyle.size, weight: fontStyle.weight, width: fontStyle.width)
    }
}
