package com.secondhand.domain.product.repository;

import com.secondhand.domain.product.Product;
import com.secondhand.web.dto.requset.ProductSearchCondition;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface ProductCustomRepository {
    Slice<Product> findAllByTowns(ProductSearchCondition condition, Pageable pageable, long userId);
}
