//
//  ProductViewModel.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/22.
//

import Foundation

struct ProductViewModel: ProductCellRepresentable {
    let pastTimeCalculator: PastTimeCalculable
    
    let imageKey: String?
    let name: String
    /// 내용이 없으면 레이아웃이 깨지기 때문에 빈 공백 추가
    var townNameHoursAgo: String = " "
    let isReserved: Bool
    let price: String
    let chatCount: String
    let likedCount: String
    
    init(product: Product, pastTimeCalculator: PastTimeCalculable) {
        self.pastTimeCalculator = pastTimeCalculator
        
        self.imageKey = product.imgUrl
        self.name = product.title
        self.isReserved = product.isReserved
        
        // 29000 -> 29,000 메소드 필요
        self.price = String(product.price)
        self.chatCount = String(product.countInfo.chatCount)
        self.likedCount = String(product.countInfo.likeCount)
        
        let hoursPast = self.makeTimePastString(after: product.createdAt)
        self.townNameHoursAgo = product.town.name + hoursPast
        // String -> Bool 변환 필요
        //  self.isReserved = product.status
        
        
    }
    
    private func makeTimePastString(after postedDateString: String) -> String {
        do {
            let dateComponents = try self.pastTimeCalculator.calculateTimeSince(dateString: postedDateString)
            let timePastString = try self.readBiggestTimeComponents(dateComponents)
            return timePastString
        } catch {
            print("error : \(error)")
            return ""
        }
    }
    
}

// MARK: Time format x시간 전 관련
extension ProductViewModel {
    // 0이 아닌 가장 큰 시간 단위의 값을 리턴합니다.
    private func readBiggestTimeComponents(_ dateComponents: DateComponents) throws -> String {
        let dateValues = [
            dateComponents.year,
            dateComponents.month,
            dateComponents.day,
            dateComponents.hour,
            dateComponents.minute,
            dateComponents.second
        ]
        
        for index in 0..<dateValues.count {
            if let value = dateValues[index], value != 0 {
                switch index {
                case 0: return " · \(value)년 전"
                case 1: return " · \(value)달 전"
                case 2: return " · \(value)일 전"
                case 3: return " · \(value)시 전"
                case 4: return " · \(value)분 전"
                case 5: return " · \(value)초 전"
                default: break
                }
            }
        }
        throw PastTimeRepresentationError.noValuesToPresent
    }
}

enum PastTimeRepresentationError: Error {
    case noValuesToPresent // 년, 달, 일, 시, 분, 초 중에 표현할 값이 없음
}
