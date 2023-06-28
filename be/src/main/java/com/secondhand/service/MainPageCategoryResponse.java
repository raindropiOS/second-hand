package com.secondhand.service;

import com.secondhand.domain.product.Product;
import com.secondhand.web.dto.response.MainPageResponse;
import com.secondhand.web.dto.response.ProductListResponse;

import java.util.List;

public class MainPageCategoryResponse {

    private List<ProductListResponse> products;
    private List<Integer> categoryIds;

//    public static MainPageResponse of(List<Product> page, categoryIds) {
//        return MainPageResponse.builder()
//                .products(ProductListResponse.fromList(page))
//                .build();
//    }
}
