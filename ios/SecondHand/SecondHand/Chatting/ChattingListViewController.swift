//
//  ChattingViewController.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/08.
//

import UIKit

class ChattingListViewController: UIViewController {
    
    weak var coordinator: ChattingCoordinator?
    let netwokrManager: NetworkManageable
    private let tableView: UITableView = .init()
    private let viewModel: ChattingListViewModel
    
    init(netwokrManager: NetworkManageable, viewModel: ChattingListViewModel) {
        self.netwokrManager = netwokrManager
        self.viewModel = viewModel
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        
        self.view.addSubview(self.tableView)
        
        self.tableView.dataSource = self
        self.tableView.delegate = self
        
        self.tableView.register(ChattingListTableViewCell.self, forCellReuseIdentifier: ChattingListTableViewCell.identifier)
        
        self.layoutTableView()
    }
    
    private func layoutTableView() {
        self.tableView.translatesAutoresizingMaskIntoConstraints = false
        let safeArea = self.view.safeAreaLayoutGuide
        
        NSLayoutConstraint.activate([
            self.tableView.topAnchor.constraint(equalTo: safeArea.topAnchor),
            self.tableView.leadingAnchor.constraint(equalTo: safeArea.leadingAnchor),
            self.tableView.trailingAnchor.constraint(equalTo: safeArea.trailingAnchor),
            self.tableView.bottomAnchor.constraint(equalTo: safeArea.bottomAnchor)
        ])
    }
}

// MARK: UITableViewDataSource
extension ChattingListViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: ChattingListTableViewCell.identifier, for: indexPath) as? ChattingListTableViewCell else { return UITableViewCell() }
        let viewModel = self.viewModel.chattingList[indexPath.row]
        cell.configure(viewModel)
        return cell
    }
}

// MARK: UITableViewDelegate
extension ChattingListViewController: UITableViewDelegate {
    func numberOfSections(in tableView: UITableView) -> Int {
        self.viewModel.chattingList.count
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        let heightAspect: CGFloat = 60.0/393.0
        return heightAspect * self.view.frame.width
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let sentMessagesExample = [Message(text: "안녕하세요"), Message(text: "네고 가능한가요?")]
        let receivedMessagesExample = [Message(text: "하이요"), Message(text: "얼마 정도요?")]
        let viewModelExample = ChattingViewModel(sentMessages: sentMessagesExample,
                                                 receivedMessages: receivedMessagesExample)
        self.navigationController?.pushViewController(ChattingViewController(viewModel: viewModelExample), animated: true)
        
    }
}
