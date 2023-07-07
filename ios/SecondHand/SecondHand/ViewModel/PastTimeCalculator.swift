//
//  PastTimeCalculator.swift
//  SecondHand
//
//  Created by 에디 on 2023/07/03.
//

import Foundation

class PastTimeCalculator: PastTimeCalculable {
    private let dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
    private lazy var dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = dateFormat
        return formatter
    }()
    
    func calculateTimeSince(dateString: String) throws -> DateComponents {
        let currentDate = Date.now
        guard let convertedDate = dateFormatter.date(from: dateString) else { throw DateError.dateConvertFailed }
        let calendar = Calendar.current
        let components = calendar.dateComponents([.year, .month, .day, .hour, .minute, .second], from: convertedDate, to: currentDate)
        return components
    }
}

protocol PastTimeCalculable {
    func calculateTimeSince(dateString: String) throws -> DateComponents
}

enum DateError: Error {
    case dateConvertFailed
}
