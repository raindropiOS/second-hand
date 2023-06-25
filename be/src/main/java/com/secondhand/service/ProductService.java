package com.secondhand.service;

import com.secondhand.domain.categorie.Category;
import com.secondhand.domain.exception.ProductNotFoundException;
import com.secondhand.domain.interested.Interested;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.product.CountInfo;
import com.secondhand.domain.product.Product;
import com.secondhand.domain.product.ProductRepository;
import com.secondhand.domain.town.Town;
import com.secondhand.web.dto.requset.ProductSaveRequest;
import com.secondhand.web.dto.requset.ProductUpdateRequest;
import com.secondhand.web.dto.response.ProductResponse;
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

    //TODO 굳이 필요없어보임
    public ProductResponse updateResponse(long productId, long userId) {
        Product product = findById(productId);
        Member member = memberService.findMemberById(userId);
        boolean isMine = member.checkProductIsMine(productId);
        return ProductResponse.of(isMine, product);
    }


    public void delete(long userId, long productId) {
        Product product = findById(productId);
        if (product.getMember().getId() == userId) {
            productRepository.delete(product);
        }
    }


    public ProductResponse getDetailPage(long userId, long productId) {
        Product product = findById(productId);
        Member member = memberService.findMemberById(userId);
        boolean isMine = member.checkProductIsMine(productId);
        return ProductResponse.of(isMine, product);
    }

    @Transactional
    public void registerLike(long userId, long productId, boolean liked) {

        Member member = memberService.findMemberById(userId);
        Product product = findById(productId);
        //관심상품 체크
        Interested interested = Interested.create(member, product, liked);

        product.updateInterested(interested);

        productRepository.save(product);
    }
}
