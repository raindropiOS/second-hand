package com.secondhand.service;

import com.secondhand.domain.exception.NotUserMineProductException;
import com.secondhand.domain.exception.ProductNotFoundException;
import com.secondhand.domain.product.Product;
import com.secondhand.domain.product.repository.ProductRepository;
import com.secondhand.web.dto.filtercondition.ProductCategorySearchCondition;
import com.secondhand.web.dto.filtercondition.ProductSalesSearchCondition;
import com.secondhand.web.dto.filtercondition.ProductSearchCondition;
import com.secondhand.web.dto.response.MainPageCategoryResponse;
import com.secondhand.web.dto.response.MainPageResponse;
import com.secondhand.web.dto.response.ProductListResponse;
import com.secondhand.web.dto.response.ProductResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductQueryService {

    private final ProductRepository productRepository;


    @Transactional
    public ProductResponse getDetailPage(long productId, long userId) {
        Product product = findById(productId);
        productRepository.countViews(productId);
        return ProductResponse.of(userId == product.getMember().getId(), product);
    }

    @Transactional
    public ProductResponse getDetailMinePage(long productId, long userId) {
        Product product = findById(productId);
        boolean isMine = checkIsMine(userId, product.getMember().getId());
        return ProductResponse.of(isMine, product);
    }


    @Transactional
    public MainPageResponse getProductList(ProductSearchCondition productSearchCondition, Pageable pageable, long userId) {
        Slice<Product> page = productRepository.findAllByTowns(productSearchCondition, pageable, userId);
        List<Product> products = page.getContent();
        log.debug("products = {}", products);
        return MainPageResponse.of(products);
    }

    @Transactional
    public MainPageResponse getMemberSalesProducts(ProductSalesSearchCondition condition, Pageable pageable, long userId) {
        Slice<Product> page = productRepository.findAllByStatus(condition, pageable, userId);
        List<Product> products = page.getContent();
        for (Product product : products) {
            System.out.println("product = " + product.getStatus().getValue());
        }
        log.debug("products = {}", products);
        return MainPageResponse.of(products);
    }


    public MainPageCategoryResponse getLikeProductList(ProductCategorySearchCondition productSearchCondition, Pageable pageable, long userId) {
        Slice<Product> page = productRepository.findAllByCategory(productSearchCondition, pageable, userId);
        List<Product> products = page.getContent();

        List<Long> categoryIds = products.stream()
                .map(product -> product.getCategory().getCategoryId())
                .collect(Collectors.toList());

        return MainPageCategoryResponse.of(products, categoryIds);
    }

    private boolean checkIsMine(long userId, long product) {
        if (product == userId) {
            return true;
        }
        throw new NotUserMineProductException();
    }

    public Product findById(long productId) {
        return productRepository.findById(productId).orElseThrow(ProductNotFoundException::new);
    }

}
