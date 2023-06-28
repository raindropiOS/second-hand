package com.secondhand.web.dto.response;

import com.secondhand.domain.product.CountInfo;
import com.secondhand.domain.product.Product;
import lombok.Builder;
import lombok.Getter;

import java.util.List;


@Getter
@Builder
public class MainPageResponse {


    private List<ProductListResponse> products;

    public static MainPageResponse of(List<Product> page) {
        return MainPageResponse.builder()
                .products(ProductListResponse.fromList(page))
                .build();
    }
}
