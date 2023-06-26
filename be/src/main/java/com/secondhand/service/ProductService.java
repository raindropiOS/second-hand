package com.secondhand.service;

import com.secondhand.domain.categorie.Category;
import com.secondhand.domain.exception.ProductNotFoundException;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.product.CountInfo;
import com.secondhand.domain.product.Product;
import com.secondhand.domain.town.Town;
import com.secondhand.service.repository.ProductRepository;
import com.secondhand.web.dto.requset.ProductSaveRequest;
import com.secondhand.web.dto.requset.ProductSearchCondition;
import com.secondhand.web.dto.requset.ProductUpdateRequest;
import com.secondhand.web.dto.response.MainPageResponse;
import com.secondhand.web.dto.response.ProductPagingResponse;
import com.secondhand.web.dto.response.ProductResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final TownService townService;
    private final MemberService memberService;

    @Transactional
    public void save(long userId, ProductSaveRequest requestInfo) {
        Category category = categoryService.findById(requestInfo.getCategoryId());
        Town town = townService.findById(requestInfo.getTownId());
        Member member = memberService.findMemberById(userId);
        Product product = Product.create(requestInfo, member, category, town);
        productRepository.save(product);
    }

    @Transactional
    public void update(long productId, ProductUpdateRequest updateRequest) {
        Product product = findById(productId);
        Category category = categoryService.findById(updateRequest.getCategoryId());
        Town town = townService.findById(updateRequest.getTownId());
        product.update(updateRequest, category, town);
    }

    public Product findById(long productId) {
        return productRepository.findById(productId).orElseThrow(ProductNotFoundException::new);
    }

    //TODO 굳이 필요없어보임
    public ProductResponse updateResponse(long productId, long userId) {
        Product product = findById(productId);
        boolean isMine = checkIsMine(userId, product);
        return ProductResponse.of(isMine, product);
    }

    public void delete(long userId, long productId) {
        Product product = findById(productId);
        if (product.getMember().getId() == userId) {
            productRepository.delete(product);
        }
    }

    private static boolean checkIsMine(long userId, Product product) {
        if (product.getMember().getId() == userId) {
            return true;
        }
        return false;
    }

    public ProductResponse getDetailPage(long userId, long productId) {
        Product product = findById(productId);
        boolean isMine = checkIsMine(userId, product);
        return ProductResponse.of(isMine, product);
    }

    @Transactional(readOnly = true)
    public MainPageResponse getProductList(ProductSearchCondition productSearchCondition, Pageable pageable, long userId) {
        townService.findById(productSearchCondition.getTownId());
        List<Product> all = productRepository.findAll();

        Page<ProductPagingResponse> page = productRepository.searchPage(productSearchCondition, pageable, userId);
        CountInfo countInfo = new CountInfo();
        return MainPageResponse.of(page, countInfo);
    }
}
