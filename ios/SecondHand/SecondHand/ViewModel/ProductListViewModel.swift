//
//  ProductListViewModel.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/29.
//

import Combine
import Foundation

/// 상품 목록을 나타내는 뷰에 필요한 정보만을 담은 ProductViewModel을 배열로 가질 객체
class ProductListViewModel: ProductListRepresentable {
    private var productRepository: ProductRepository
    /// ProductListViewModel가 할당해제 될 때 자동적으로 이 프라퍼티가 할당해제 되고, 구독 해제됨.
    private var subscriptions = Set<AnyCancellable>()
    @Published var productViewModels: [ProductViewModel] = []
    @Published var products: [Product] {
        didSet {
            let productViewModels = convertProductToProductViewModel(self.products)
            self.productViewModels = productViewModels
        }
    }
    private let pastTimeCalculator: PastTimeCalculable
    
    init(productRepository: ProductRepository, pastTimeCalculator: PastTimeCalculable) {
        let products = productRepository.readAll()
        
        self.products = products
        self.productRepository = productRepository
        self.pastTimeCalculator = pastTimeCalculator
        
        self.productRepository.objectWillChange
            .sink { [weak self] _ in
                let products = productRepository.readAll()
                self?.products = products
            }
            .store(in: &subscriptions)
    }
    
    func readProductList() -> [Product] {
        self.productRepository.readAll()
    }
    
    func loadProductList(query: [String: String], completion: @escaping () -> Void) async {
        await self.productRepository.loadProducts(query: query)
        completion()
    }
    
    /// DTO이자 모델에 해당하는 Product를 ViewModel로 변경하는 메소드
    private func convertProductToProductViewModel(_ products: [Product]) -> [ProductViewModel] {
        
        return self.products.map { product in ProductViewModel(product: product, pastTimeCalculator: self.pastTimeCalculator) }
    }
    
    private func updateView() {
        
    }
}

protocol ProductListRepresentable {
    func readProductList() -> [Product]
    func loadProductList(query: [String: String], completion: @escaping () -> Void) async
}
