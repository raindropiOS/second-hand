//
//  ProductViewModel.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/22.
//

import Foundation

struct ProductViewModel {
    let imageKey: String?
    let name: String
    let townName: String
    let hoursPast: String
    let isReserved: Bool
    let price: String
    let chatCount: String
    let likedCount: String
    
    init(product: Product) {
        self.imageKey = product.imgUrl
        self.name = product.title
        self.townName = product.town.name
        // 시간 수정 메소드 필요
        self.hoursPast = product.createdAt
        // String -> Bool 변환 필요
        //  self.isReserved = product.status
        self.isReserved = true

        // 29000 -> 29,000 메소드 필요
        //  self.price = product.price
        self.price = "9900"
        self.chatCount = String(product.countInfo.chatCount)
        self.likedCount = String(product.countInfo.likeCount)
    }
    
    private func calculateHoursPast() {
        
    }
}
