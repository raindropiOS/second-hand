//
//  SignUpViewController.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/08.
//

import UIKit

class SignUpViewController: UIViewController {
    private let button: UIButton = {
        let button = UIButton(type: .system)
        let symbolConfig = UIImage.SymbolConfiguration(pointSize: 16, weight: .regular)
        let symbolImage = UIImage(systemName: "plus", withConfiguration: symbolConfig)
        button.layer.cornerRadius = 8
        button.layer.borderWidth = 1
        button.layer.borderColor = UIColor(red: 0.702, green: 0.702, blue: 0.702, alpha: 0.39).cgColor
        button.backgroundColor = .white
        button.translatesAutoresizingMaskIntoConstraints = false
        button.setImage(symbolImage, for: .normal)
        button.tintColor = .black
        button.imageEdgeInsets = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 10)
        button.titleEdgeInsets = UIEdgeInsets(top: 0, left: 10, bottom: 0, right: 0)
        button.contentEdgeInsets = UIEdgeInsets(top: 16, left: 0, bottom: 16, right: 0)
        button.setTitle("위치 추가", for: .normal)
        
            return button
        }()
    private let circleButton: UIButton = {
        let circleButton = UIButton(type: .custom)
        let symbolConfig = UIImage.SymbolConfiguration(pointSize: 24, weight: .regular)
        let symbolImage = UIImage(systemName: "camera", withConfiguration: symbolConfig)
        circleButton.frame = CGRect(x: 0, y: 0, width: 80, height: 80)
        circleButton.layer.cornerRadius = 0.5 * circleButton.bounds.size.width
        circleButton.clipsToBounds = true
        circleButton.translatesAutoresizingMaskIntoConstraints = false
        circleButton.layer.borderWidth = 1
        circleButton.layer.borderColor = UIColor(red: 0.702, green: 0.702, blue: 0.702, alpha: 0.39).cgColor
        circleButton.backgroundColor = .white
        circleButton.tintColor = .black
        circleButton.setImage(symbolImage, for: .normal)
        circleButton.contentEdgeInsets = UIEdgeInsets(top: 25.5, left: 22.5, bottom: 25.5, right: 22.5)
        
        return circleButton
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    

}
