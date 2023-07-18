//
//  SceneDelegate.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/05.
//

import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?
    
    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = (scene as? UIWindowScene) else { return }
        
        let window = UIWindow(windowScene: windowScene)
        let tabBarController = TabBarController()
        
        window.rootViewController = tabBarController
        window.makeKeyAndVisible()
        
        self.window = window
    }
    
    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        if let url = URLContexts.first?.url {
            let networkManager = NetworkManager()
            let keychainManager = KeychainManager()
            Task {
                do {
                    let authorizationCode = try networkManager.getQueryItemValue(urlString: url.absoluteString, key: "code")
                    // TODO: 받은 데이터를 처리해야함.
                    let responseData = try await networkManager.sendAuthorizationCode(authorizationCode)
                    if let dto = responseData as? GitHubOAuthResponseDTO {
                        let jwtToken = dto.data.jwtToken
                        let accessToken = jwtToken.accessToken
                        let refreshToken = jwtToken.refreshToken
                        let tempToken = accessToken + "." + refreshToken
                        let jwt = JWT(token: tempToken)
                        await keychainManager.saveJWT(jwt)
                    } else {
                        print("failed to type cast responseData while receiving jwt token")
                    }
                } catch {
                    print("error : \(error)")
                }
            }
          
            let tabBarController = self.window?.rootViewController as? TabBarController
            
            if let tabBarController = tabBarController {
                if let navigationController = tabBarController.viewControllers?[4] as? UINavigationController {
                    navigationController.pushViewController(EmailInputViewController(networkManager: NetworkManager(), keychainManager: KeychainManager()), animated: true)
                }
            }
        }
    }
}
