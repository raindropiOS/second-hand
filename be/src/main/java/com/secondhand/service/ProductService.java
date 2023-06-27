package com.secondhand.service;

import com.secondhand.domain.categorie.Category;
import com.secondhand.domain.exception.NotUserMineProductException;
import com.secondhand.domain.exception.ProductNotFoundException;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.product.CountInfo;
import com.secondhand.domain.product.Product;
import com.secondhand.domain.town.Town;
import com.secondhand.service.repository.ProductRepository;
import com.secondhand.web.dto.requset.ProductSaveRequest;
import com.secondhand.web.dto.requset.ProductSearchCondition;
import com.secondhand.web.dto.response.MainPageResponse;
import com.secondhand.web.dto.response.ProductResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final TownService townService;
    private final MemberService memberService;

    @Transactional
    public Long save(long userId, ProductSaveRequest requestInfo) {
        Category category = categoryService.findById(requestInfo.getCategoryId());
        Town town = townService.findById(requestInfo.getTownId());
        Member member = memberService.findMemberById(userId);
        Product product = Product.create(requestInfo, member, category, town);
        Product saveProduct = productRepository.save(product);
        return saveProduct.getId();
    }

    @Transactional
    public void update(long productId, ProductSaveRequest updateRequest, long userId) {
        Category category = categoryService.findById(updateRequest.getCategoryId());
        Town town = townService.findById(updateRequest.getTownId());
        Product product = findById(productId);
        checkIsMine(userId, product);
        product.update(updateRequest, category, town);
        log.debug("product = {}", product);
    }

    public Product findById(long productId) {
        return productRepository.findById(productId).orElseThrow(ProductNotFoundException::new);
    }

    //TODO 굳이 필요없어보임
    @Transactional
    public ProductResponse getDetailPage(long productId, long userId) {
        Product product = findById(productId);
        boolean isMine = checkIsMine(userId, product);
        productRepository.countViews(productId);
        return ProductResponse.of(isMine, product);
    }

    public void delete(long userId, long productId) {
        Product product = findById(productId);
        if (product.getMember().getId() == userId) {
            productRepository.delete(product);
        }
    }

    private boolean checkIsMine(long userId, Product product) {
        if (product.getMember().getId() == userId) {
            return true;
        }
        throw new NotUserMineProductException();
    }

    public MainPageResponse getProductList(ProductSearchCondition productSearchCondition, Pageable pageable, long userId) {
        Slice<Product> page = productRepository.findAllByTowns(productSearchCondition, pageable, userId);
        List<Product> products = page.getContent();
        //Count 에 대한 정보들
        CountInfo countInfo = new CountInfo();
        //page
        log.debug("page = {} ", page);
        return MainPageResponse.of(page, countInfo);
    }

    public void getMemberSalesProducts(ProductSearchCondition productSearchCondition, Pageable pageable, long userId) {
    }
}
