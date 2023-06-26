package com.secondhand.web.dto.response;

import com.secondhand.domain.product.CountInfo;
import com.secondhand.domain.product.Product;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;

import java.util.List;


@Getter
@Builder
public class MainPageResponse {


    private Slice<Product> products;
    private CountInfo countInfo;

    public static MainPageResponse of(Slice<Product> page, CountInfo countInfo) {
        return MainPageResponse.builder()
                .products(page)
                .countInfo(countInfo)
                .build();
    }
}
