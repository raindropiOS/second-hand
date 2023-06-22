package com.secondhand.service;

import com.secondhand.domain.categorie.Category;
import com.secondhand.domain.exception.ProductNotFoundException;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.product.CountInfo;
import com.secondhand.domain.product.Product;
import com.secondhand.domain.product.ProductRepository;
import com.secondhand.domain.town.Town;
import com.secondhand.web.contoroller.ProductUpdateResponse;
import com.secondhand.web.dto.requset.ProductSaveRequest;
import com.secondhand.web.dto.requset.ProductUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

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

    public ProductUpdateResponse updateResponse(long productId, long userId) {
        Product product = findById(productId);
        boolean isMine = checkIsMine(userId, product);

        return ProductUpdateResponse.builder()
                .isMine(isMine)
                .seller(product.getMember())
                .status(product.getStatus())
                .title(product.getTitle())
                .content(product.getContent())
                .createdAt(LocalDateTime.now())
                .category(product.getCategory())
                .price(product.getPrice())
                .countInfo(
                        CountInfo.builder()
                                .chatCount(0)
                                .likeCount(product.getCountLike())
                                .viewCount(product.getCountView())
                                .build()
                )
                .isLiked(true)
                .build();
    }

    private static boolean checkIsMine(long userId, Product product) {
        boolean isMine = false;
        if (product.getMember().getId() == userId) {
            isMine = true;
        }
        return isMine;
    }
}
