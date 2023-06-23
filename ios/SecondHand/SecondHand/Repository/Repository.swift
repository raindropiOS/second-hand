//
//  Repository.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/21.
//

import Foundation

protocol Repository {
    associatedtype SomeDatum
    associatedtype SomeId
    
    func readAll() -> [SomeDatum]
    func create(_: SomeDatum)
    func read(_: SomeId) -> SomeDatum?
    func update(_: SomeDatum, with: SomeDatum)
    func delete(_: SomeDatum)
}
