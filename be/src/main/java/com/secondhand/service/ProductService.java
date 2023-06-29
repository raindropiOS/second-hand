package com.secondhand.service;

import com.secondhand.domain.categorie.Category;
import com.secondhand.domain.exception.NotUserMineProductException;
import com.secondhand.domain.exception.ProductNotFoundException;
import com.secondhand.domain.interested.Interested;
import com.secondhand.domain.interested.InterestedRepository;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.product.Product;
import com.secondhand.domain.product.ProductImage;
import com.secondhand.domain.product.repository.ProductRepository;
import com.secondhand.domain.town.Town;
import com.secondhand.web.dto.requset.ProductSaveRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final InterestedRepository interestedRepository;
    private final CategoryService categoryService;
    private final TownService townService;
    private final MemberService memberService;
    private final ImageService imageService;

    @Transactional
    public Long save(long userId, ProductSaveRequest requestInfo) {
        Category category = categoryService.findById(requestInfo.getCategoryId());
        Town town = townService.findById(requestInfo.getTownId());
        Member member = memberService.findMemberById(userId);
        Product product = Product.create(requestInfo, member, category, town);
        Product saveProduct = productRepository.save(product);
        ProductImage productImage = new ProductImage();
       // imageService.upload(requestInfo.getProductImages());
        return saveProduct.getId();
    }

    @Transactional
    public void update(long productId, ProductSaveRequest updateRequest, long userId) {
        Category category = categoryService.findById(updateRequest.getCategoryId());
        Town town = townService.findById(updateRequest.getTownId());
        Product product = findById(productId);
        checkIsMine(userId, product.getMember().getId());
        product.update(updateRequest, category, town);
        log.debug("product = {}", product);
    }

    @Transactional
    public void changeLike(long productId, long userId, boolean likeRequest) {
        Member member = memberService.findMemberById(userId);
        Product product = findById(productId);
        checkIsMine(member.getId(), product.getMember().getId());
        Optional<Interested> findInterested = interestedRepository.findByProductIdAndMemberId(productId, member.getId());
        if (findInterested.isPresent()) {
            interestedRepository.delete(findInterested.get());
            log.debug("product.getInteresteds() = {}", product.getInteresteds());
            return;
        }
        Interested interested = Interested.create(member, product, likeRequest);
        Interested save = interestedRepository.save(interested);
        product.updateInterested(save);
    }


    @Transactional
    public void changeStatus(long productId, long userId, Integer statusRequest) {
        Product product = findById(productId);
        Long memberId = product.getMember().getId();
        if (memberId == userId) {
            product.updateStatus(statusRequest);
            return;
        }
        throw new NotUserMineProductException();
    }


    //TODO 굳이 필요없어보임


    @Transactional
    public void delete(long userId, long productId) {
        Product product = findById(productId);
        checkIsMine(userId, product.getMember().getId());
        if (product.getMember().getId() == userId) {
            productRepository.delete(product);
        }
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
