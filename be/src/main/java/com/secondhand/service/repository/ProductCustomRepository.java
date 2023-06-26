package com.secondhand.service.repository;

import com.secondhand.web.dto.requset.ProductSearchCondition;
import com.secondhand.web.dto.response.ProductPagingResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductCustomRepository {
    Page<ProductPagingResponse> searchPage(ProductSearchCondition condition, Pageable pageable, long userId);
}
