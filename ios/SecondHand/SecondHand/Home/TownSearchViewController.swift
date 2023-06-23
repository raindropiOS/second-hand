//
//  TownSearchViewController.swift
//  SecondHand
//
//  Created by 김하림 on 2023/06/21.
//

import UIKit

class TownSearchViewController: UIViewController, UISearchControllerDelegate, UISearchBarDelegate {
    let searchBarController = UISearchController()

    override func viewDidLoad() {
        super.viewDidLoad()
    private func configureNavigationBar() {
        self.navigationItem.title = ""
        self.navigationItem.leftBarButtonItem = UIBarButtonItem(title: "닫기", style: .plain, target: self, action: #selector(dismissButtonTouched))
        self.navigationItem.searchController = searchBarController
        searchBarController.delegate = self
        searchBarController.searchBar.delegate = self
    }

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
