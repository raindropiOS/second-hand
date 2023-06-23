//
//  TownSettingViewController.swift
//  SecondHand
//
//  Created by 김하림 on 2023/06/21.
//

import UIKit

class TownSettingViewController: UIViewController {

    private let descriptionLabel: UILabel = {
        let descriptionLabel = UILabel()
        descriptionLabel.text = "지역은 최소 1개, \n 최대 2개까지 설정 가능해요"
        descriptionLabel.textAlignment = .center
        descriptionLabel.numberOfLines = 2
        return descriptionLabel
    }()
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
