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
    func setupSubviews() {
        tableView.delegate = self
        tableView.dataSource = self
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")
        tableView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(tableView)
    }

    func setupConstraints() {
        NSLayoutConstraint.activate([
            tableView.topAnchor.constraint(equalTo: view.topAnchor),
            tableView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            tableView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            tableView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
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

extension TownSearchViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.searchResults.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
            
        cell.textLabel?.text = searchResults[indexPath.row].title
        cell.backgroundColor = .clear
        cell.selectionStyle = .none
        return cell
        }
}

extension TownSearchViewController: UISearchResultsUpdating {
    func updateSearchResults(for searchController: UISearchController) {
        searchBar(self.searchBarController.searchBar, textDidChange: self.searchBarController.searchBar.text ?? "")
    }
}

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
