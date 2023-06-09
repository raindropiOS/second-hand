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

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    

}
