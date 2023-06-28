package com.secondhand.web.dto.response;

import com.secondhand.domain.product.Product;
import com.secondhand.web.dto.response.MainPageResponse;
import com.secondhand.web.dto.response.ProductListResponse;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MainPageCategoryResponse {

    private List<ProductListResponse> products;
    private List<Integer> categoryIds;

    public static MainPageCategoryResponse of(List<Product> page, List<Long> categoryIds) {
        return MainPageCategoryResponse.builder()
                .products(ProductListResponse.fromList(page))
                .build();
    }
}
