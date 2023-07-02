//
//  ProductListViewModel.swift
//  SecondHand
//
//  Created by 에디 on 2023/06/29.
//

import Combine
import Foundation

/// 상품 목록을 나타내는 뷰에 필요한 정보만을 담은 ProductViewModel을 배열로 가질 객체
class ProductListViewModel {
    private var productRepository: ProductRepository
    /// ProductListViewModel가 할당해제 될 때 자동적으로 이 프라퍼티가 할당해제 되고, 구독 해제됨.
    private var subscriptions = Set<AnyCancellable>()
    @Published var productViewModels: [ProductViewModel] = []
    @Published private var products: [Product] {
        didSet {
            let productViewModels = convertProductToProductViewModel(self.products)
            self.productViewModels = productViewModels
        }
    }
    
    init(productRepository: ProductRepository) {
        let products = productRepository.readAll()
        
        self.products = products
        self.productRepository = productRepository
        
        self.productRepository.objectWillChange
            .sink { [weak self] _ in
                let products = productRepository.readAll()
                self?.products = products
            }
            .store(in: &subscriptions)
    }
    
    /// DTO이자 모델에 해당하는 Product를 ViewModel로 변경하는 메소드
    private func convertProductToProductViewModel(_ products: [Product]) -> [ProductViewModel] {
        self.products.map { product in ProductViewModel(product: product) }
    }
    
    private func updateView() {
        
    }
}
