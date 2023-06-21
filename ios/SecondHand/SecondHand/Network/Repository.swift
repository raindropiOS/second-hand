//
//  Repository.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/21.
//

import Foundation

protocol Repository {
    associatedtype SomeDatum
    
    func create(_: SomeDatum)
    func readDatum(key: any Hashable) -> SomeDatum
    func update(_: SomeDatum)
    func delete(_: SomeDatum)
}
