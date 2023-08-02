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
    
    init(presenter: UINavigationController) {
        self.presenter = presenter
        self.childCoordinators = []
        
        UserManager.shared.$isSignedIn.sink { [self] newData in
            if newData == true {
                Task {
                    let userInfo = try await self.networkManager.fetchProfileInfo()
                    let viewModel = ProfileViewModel(
                        profileImageUrlString: userInfo.profileImageUrlString,
                        userName: userInfo.name)
                    DispatchQueue.main.async {
                        self.start(viewModel: viewModel, networkManager: self.networkManager)
                    }
                }
            } else {
                if presenter.visibleViewController is ProfileViewController {
                    presenter.popViewController(animated: true)
                }
            }
        }
        .store(in: &self.cancellables)
    }
    func start(networkManager: NetworkManageable) {
        let signInViewController = SignInViewController(networkManager: networkManager)
        presenter.pushViewController(signInViewController, animated: true)
        separatorLine()
    }
    
    func start(viewModel: ProfileViewModel, networkManager: NetworkManageable) {
        let profileViewController = ProfileViewController(networkManager: networkManager, viewModel: viewModel)
        profileViewController.coordinator = self
        profileViewController.navigationItem.hidesBackButton = true
        presenter.pushViewController(profileViewController, animated: true)
        separatorLine()
    }
    
    func startEmailInputView(networkManager: NetworkManageable,
                             keychainManager: KeychainManageable) {
        let emailInputViewController = EmailInputViewController(networkManager: networkManager,
                                                                keychainManager: keychainManager)
        emailInputViewController.coordinator = self
        presenter.pushViewController(emailInputViewController, animated: true)
    }
    
    private func separatorLine() {
        let appearance = UINavigationBarAppearance()
        appearance.backgroundColor = .white
        appearance.shadowColor = .separator
        self.presenter.navigationBar.scrollEdgeAppearance = appearance
        self.presenter.navigationBar.standardAppearance = appearance
    }
}
