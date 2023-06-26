package com.secondhand.domain.product.repository;

import com.secondhand.web.dto.requset.ProductSearchCondition;
import com.secondhand.web.dto.response.ProductPagingResponse;
import com.secondhand.web.dto.response.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductCustomRepository {
    Page<ProductPagingResponse> searchPage(ProductSearchCondition condition, Pageable pageable,long userId);
}
