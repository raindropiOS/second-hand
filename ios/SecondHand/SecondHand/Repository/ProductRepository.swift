//
//  ProductRepository.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/21.
//

import Foundation

class ProductRepository: Repository {
    typealias SomeDatum = Product
    typealias SomeId = Int
    private var products: [Product] = []
    
    func readAll() -> [Product] {
        self.products
    }
    
    func create(_ product: Product) {
        self.products.append(product)
    }
    
    func readDatum(with id: Int) -> Product? {
        if let index = self.findIndexOf(id) {
            return products[index]
        }
        return nil
    }
    
    func update(_ product: Product, with newProduct: Product) {
        let id = product.productId
        guard let index = self.findIndexOf(id) else { return }
        self.products[index] = newProduct
    }
    
    func delete(_ product: Product) {
        guard let id = findIndexOf(product) else { return }
        self.products.remove(at: id)
    }
    
    private func findIndexOf(_ product: Product) -> Int? {
        self.products.firstIndex(where: { $0.productId == product.productId })
    }
    
    private func findIndexOf(_ id: Int) -> Int? {
        self.products.firstIndex(where: { $0.productId == id })
    }
}
