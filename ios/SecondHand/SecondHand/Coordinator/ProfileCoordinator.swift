//
//  ProfileCoordinator.swift
//  SecondHand
//
//  Created by 김하림 on 2023/07/20.
//

import Combine
import UIKit

class ProfileCoordinator: Coordinator {
    var delegate: CoordinatorFinishDelegate?
    
    var presenter: UINavigationController
    
    var childCoordinators: [Coordinator]
    
    var cancellables = Set<AnyCancellable>()
    
    private let networkManager: NetworkManageable = NetworkManager.shared
    private var viewModel: ProfileViewModel = ProfileViewModel(profileImageUrlString: "", userName: "")
    
    init(presenter: UINavigationController) {
        self.presenter = presenter
        self.childCoordinators = []
        
        UserManager.shared.$isSignedIn.sink { [self] newData in
            if newData == true {
                self.start(viewModel: viewModel, networkManager: networkManager)
            } else {
                self.start(networkManager: networkManager)
            }
        }
    }
    func start(networkManager: NetworkManageable) {
        let signInViewController = SignInViewController(networkManager: networkManager)
        presenter.pushViewController(signInViewController, animated: true)
        separatorLine()
    }
    
    func start(viewModel: ProfileViewModel, networkManager: NetworkManageable) {
        let profileViewController = ProfileViewController(networkManager: networkManager, viewModel: viewModel)
        profileViewController.coordinator = self
        presenter.pushViewController(profileViewController, animated: true)
        separatorLine()
    }
    
    private func separatorLine() {
        let appearance = UINavigationBarAppearance()
        appearance.backgroundColor = .white
        appearance.shadowColor = .separator
        self.presenter.navigationBar.scrollEdgeAppearance = appearance
        self.presenter.navigationBar.standardAppearance = appearance
    }
}
