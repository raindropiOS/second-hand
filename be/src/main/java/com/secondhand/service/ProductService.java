package com.secondhand.service;

import com.secondhand.domain.categorie.Category;
import com.secondhand.domain.exception.ProductNotFoundException;
import com.secondhand.domain.interested.Interested;
import com.secondhand.domain.interested.InterestedRepository;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.product.Product;
import com.secondhand.domain.product.ProductRepository;
import com.secondhand.domain.product.Status;
import com.secondhand.domain.town.Town;
import com.secondhand.web.contoroller.UpdateProductStateRequest;
import com.secondhand.web.dto.requset.ProductSaveRequest;
import com.secondhand.web.dto.requset.ProductUpdateRequest;
import com.secondhand.web.dto.response.ProductResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final TownService townService;
    private final MemberService memberService;
    private final InterestedRepository interestedRepository;

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
        log.debug("관심 목록 업데이 전의 product= {} ,", product);
        //관심상품 체크
        Interested interested = Interested.create(member, product, liked);
        log.debug("interested = {} ,", interested);
        interestedRepository.save(interested);
        product.updateInterested(interested);
        log.debug("관심 목록 업데이트 후의 product= {} ,", product);
    }

    @Transactional
    public void updateStatus(long userId, long productId, UpdateProductStateRequest stateRequest) {
        //있는 회원인지 검증
        memberService.findMemberById(userId);
        Product product = findById(productId);
        Status status = Status.getStatusByValue(stateRequest.getState());
        product.updateStatus(status);
    }

    public Product findById(long productId) {
        return productRepository.findById(productId).orElseThrow(ProductNotFoundException::new);
    }
}
