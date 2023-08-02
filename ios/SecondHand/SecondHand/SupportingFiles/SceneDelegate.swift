//
//  SceneDelegate.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/05.
//

import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?
    var appCoordinator: AppCoordinator?
    private let networkManager = NetworkManager()

    
    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = (scene as? UIWindowScene) else { return }
        
        window = UIWindow(windowScene: windowScene)
        
        self.appCoordinator = AppCoordinator(window: window!)
        appCoordinator?.start(networkManager: networkManager)
    }
    
    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        if let url = URLContexts.first?.url {
            Task {
                do {
                    let authorizationCode = try networkManager.getQueryItemValue(urlString: url.absoluteString, key: "code")
                    let responseDto = try await networkManager.sendAuthorizationCode(authorizationCode)
                        let jwtToken = responseDto.data.jwtToken
                        let accessToken = jwtToken.accessToken
                        let refreshToken = jwtToken.refreshToken
                        let jwt = JWT(accessToken: accessToken, refreshToken: refreshToken)
                    KeychainManager.shared.temporarySavedJwt = jwt
                        
                        DispatchQueue.main.async {
                            if let profileCoordinator = self.appCoordinator?
                                .childCoordinators[0]
                                .childCoordinators[4] as? ProfileCoordinator {
                                profileCoordinator.startEmailInputView(networkManager: self.networkManager)
                            }
                        } 
                    
                } catch {
                    print("error : \(error)")
                }
            }
        }
    }
}
