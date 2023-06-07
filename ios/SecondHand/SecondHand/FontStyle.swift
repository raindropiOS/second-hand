//
//  FontStyle.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/07.
//

import UIKit.UIFont

enum FontStyle {
    case largeTitle
    case title1
    case title2
    case title3
    case headline
    case body
    case callout
    case subhead
    case footnote
    case caption1
    case caption2
}

extension UIFont {
    static func custom(_ name: FontStyle) -> UIFont {
        switch name {
        case .largeTitle: return UIFont.systemFont(ofSize: 34, weight: .regular, width: .standard)
        case .title1: return UIFont.systemFont(ofSize: 28, weight: .regular, width: .standard)
        case .title2: return UIFont.systemFont(ofSize: 22, weight: .regular, width: .standard)
        case .title3: return UIFont.systemFont(ofSize: 20, weight: .regular, width: .standard)
        case .headline: return UIFont.systemFont(ofSize: 17, weight: .regular, width: .standard)
        case .body: return UIFont.systemFont(ofSize: 17, weight: .regular, width: .standard)
        case .callout: return UIFont.systemFont(ofSize: 17, weight: .regular, width: .standard)
        case .subhead: return UIFont.systemFont(ofSize: 16, weight: .regular, width: .standard)
        case .footnote: return UIFont.systemFont(ofSize: 15, weight: .regular, width: .standard)
        case .caption1: return UIFont.systemFont(ofSize: 13, weight: .regular, width: .standard)
        case .caption2: return UIFont.systemFont(ofSize: 12, weight: .regular, width: .standard)
        }
    }
}
