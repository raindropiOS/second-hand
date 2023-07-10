//
//  ProductViewModel.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/22.
//

import Foundation

class ProductViewModel: ObservableObject {
    /// UIKit을 import하지 않기 위해,
    /// NSCache로 이미지를 Network Layer에어 저장하고 key(string)으로 저장하는 방향으로 할 예정
    let imageKey: String?
    let name: String
    let townName: String
    let hoursPast: String
    let isReserved: Bool
    let price: String
    let chatCount: Int
    let likedCount: Int
    
    init(imageKey: String? = nil, name: String, townName: String, hoursPast: String, isReserved: Bool, price: String, chatCount: Int, likedCount: Int) {
        self.imageKey = imageKey
        self.name = name
        self.townName = townName
        self.hoursPast = hoursPast
        self.isReserved = isReserved
        self.price = price
        self.chatCount = chatCount
        self.likedCount = likedCount
    }
}
