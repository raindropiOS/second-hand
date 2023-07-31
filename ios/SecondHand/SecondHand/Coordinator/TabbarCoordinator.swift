//
//  TabbarCoordinator.swift
//  SecondHand
//
//  Created by 김하림 on 2023/07/25.
//

import UIKit
class TabBarCoordinator: NSObject, Coordinator {
    
    enum TabBarItem: CaseIterable {
        case home
        case salesLog
        case likeList
        case chatting
        case profile
        
        var title: String {
            switch self {
            case .home: return "홈"
            case .salesLog: return "판매내역"
            case .likeList: return "관심목록"
            case .chatting: return "채팅"
            case .profile: return "내 계정"
            }
        }
        var image: String {
            switch self {
            case .home: return "house"
            case .salesLog: return "newspaper"
            case .likeList: return "heart"
            case .chatting: return "message"
            case .profile: return "person"
            }
        }
            
        

        func getCoordinator(presenter: UINavigationController) -> Coordinator {
            switch self {
            case .home: return HomeCoordinator(presenter: presenter)
            case .salesLog: return SalesLogCoordinator(presenter: presenter)
            case .likeList: return LikeListCoordinator(presenter: presenter)
            case .chatting: return SalesLogCoordinator(presenter: presenter)
            case .profile: return ProfileCoordinator(presenter: presenter)
            }
        }
    }
