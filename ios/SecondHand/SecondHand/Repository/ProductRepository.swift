//
//  ProductRepository.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/21.
//

import Combine
import Foundation

class ProductRepository: Repository, ObservableObject {
    typealias SomeDatum = Product
    typealias SomeId = Int
    
    /// Repository Layer와 Network Layer 분리를 위한 delegate 및 extension으로 network 메소드 선언하였습니다.
    private let networkManagerDelegate: NetworkManageable
    private var subscriptions = Set<AnyCancellable>()
    
    @Published var products: [Product] = []
    
    init(networkManagerDelegate: NetworkManageable) {
        self.networkManagerDelegate = networkManagerDelegate
        
        UserInfoManager.shared.$isSignedIn.sink { _ in
            Task {
                await self.loadProducts(query: [:])
            }
        }
        .store(in: &subscriptions)
    }
    
    func loadProducts(query: [String: String]) async {
        let products = await networkManagerDelegate.fetchProducts(query: query)
        self.products = products
    }
    
    func readAll() -> [Product] {
        self.products
    }
    
    func create(_ product: Product) {
        self.products.append(product)
    }
    
    func read(_ id: Int) -> Product? {
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

// MARK: Network Layer
extension ProductRepository {
    func storeProducts(query: [String: String]) async {
        let products = await self.networkManagerDelegate.fetchProducts(query: query)
        self.products = products
    }
}
