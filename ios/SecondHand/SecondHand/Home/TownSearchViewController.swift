//
//  TownSearchViewController.swift
//  SecondHand
//
//  Created by 김하림 on 2023/06/21.
//

import UIKit
import MapKit

class TownSearchViewController: UIViewController, UISearchControllerDelegate, UISearchBarDelegate {
    let searchBarController = UISearchController()
    let tableView = UITableView()
    private var searchCompleter = MKLocalSearchCompleter()

    var searchResults = [MKLocalSearchCompletion]()

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
    
    func setupSearchCompleter() {
        searchCompleter.delegate = self
        searchCompleter.resultTypes = .address
        }

    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
            // searchText를 queryFragment로 넘겨준다.
            searchCompleter.queryFragment = searchText
        }
}

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
extension TownSearchViewController: UISearchResultsUpdating {
    func updateSearchResults(for searchController: UISearchController) {
        searchBar(self.searchBarController.searchBar, textDidChange: self.searchBarController.searchBar.text ?? "")
    }
    */

extension TownSearchViewController: MKLocalSearchCompleterDelegate {
    // 자동완성 완료 시에 결과를 받는 함수
    func completerDidUpdateResults(_ completer: MKLocalSearchCompleter) {
        // completer.results를 통해 검색한 결과를 searchResults에 담아줍니다
        searchResults = completer.results
        self.tableView.reloadData()
    }
    
    func completer(_ completer: MKLocalSearchCompleter, didFailWithError error: Error) {
        // 에러 확인
        print(error.localizedDescription)
    }
}
