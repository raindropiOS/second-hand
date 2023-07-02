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
    @Published var products: [Product]
    var cancellables = Set<AnyCancellable>()
    @Published var productViewModels: [ProductViewModel] = []
    
    init(products: [Product]) {
        self.products = products
        
        self.$products
            .sink { [weak self] _ in
                // 강한 순환 참조를 피하기 위해 캡쳐리스트 사용
                // 값이 변경될 때 수행할 작업
                self?.loadProductViewModels()
                self?.updateView()
            }
            .store(in: &cancellables)
    }
    
    private func loadProductViewModels() {
        let productViewModels = self.convertProductToProductViewModel()
        self.productViewModels = productViewModels
    }
    
    /// DTO이자 모델에 해당하는 Product를 ViewModel로 변경하는 메소드
    private func convertProductToProductViewModel() -> [ProductViewModel] {
        self.products.map { product in ProductViewModel(product: product) }
    }
    
    private func updateView() {
        
    }
}
