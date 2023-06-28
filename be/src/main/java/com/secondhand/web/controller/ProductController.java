package com.secondhand.web.controller;

import com.secondhand.login.LoginCheck;
import com.secondhand.login.LoginValue;
import com.secondhand.service.ProductService;
import com.secondhand.util.BasicResponse;
import com.secondhand.web.dto.requset.ProductSaveRequest;
import com.secondhand.web.dto.requset.ProductSearchCondition;
import com.secondhand.web.dto.requset.StatusOrLikeRequest;
import com.secondhand.web.dto.response.MainPageResponse;
import com.secondhand.web.dto.response.ProductLikeResponse;
import com.secondhand.web.dto.response.ProductResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @Operation(
            summary = "상품 10개씩 리스트",
            tags = "products",
            description = "사용자는 상품을 10개씩 상품 리스프로 볼 수 있다(지역 과 카테고리) 좋아요유무.."
    )
    @LoginCheck
    @GetMapping
    public BasicResponse<MainPageResponse> viewPage(ProductSearchCondition productSearchCondition,
                                                    Pageable pageable,
                                                    @LoginValue long userId) {

        MainPageResponse mainPageResponse = productService.getProductList(productSearchCondition, pageable, userId);

        return BasicResponse.<MainPageResponse>builder()
                .success(true)
                .message("사용자는 상품을 10개씩 상품 리스프로 볼 수 있다(지역 과 카테고리) ")
                .apiStatus(20000)
                .data(mainPageResponse)
                .httpStatus(HttpStatus.OK)
                .build();
    }

    @Operation(
            summary = "관심 목록을 카테고리 별로 확인",
            tags = "products",
            description = "사용자는 자시의 관심 목록을 카테고리 뱔로 확인 가능."
    )
    @LoginCheck
    @GetMapping("/like")
    public BasicResponse<MainPageResponse> productLikeCategoryView(@LoginValue long userId) {

        //   productService.getLikeProductList(userId);

        return BasicResponse.<MainPageResponse>builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();
    }

    @Operation(
            summary = "판매/세일 중인 상품",
            tags = "products",
            description = "사용자는 세일/판매 중인 상품을 볼수 있다."
    )
    @LoginCheck
    @GetMapping("/sales")
    public BasicResponse<MainPageResponse> productSalesView(ProductSearchCondition productSearchCondition,
                                                            Pageable pageable,
                                                            @LoginValue long userId) {

        productService.getMemberSalesProducts(productSearchCondition, pageable, userId);

        return BasicResponse.<MainPageResponse>builder()
                .success(true)
                .message("판매/세일 중인 상품")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();
    }

    @Operation(
            summary = "상품 등록",
            tags = "products",
            description = "사용자는 단일 상품을 등록할 수 있다 저장된 product id반환."
    )
    @LoginCheck
    @PostMapping
    public BasicResponse<Long> save(@LoginValue long userId,
                                    @RequestBody ProductSaveRequest productSaveRequest) {
        Long save = productService.save(userId, productSaveRequest);
        return BasicResponse.<Long>builder()
                .success(true)
                .message("상품 등록")
                .apiStatus(20000)
                .data(save)
                .httpStatus(HttpStatus.CREATED)
                .build();
    }

    @Operation(
            summary = "상품 수정",
            tags = "products",
            description = "사용자는 단일 상품을 수정할 수 있다."
    )
    @LoginCheck
    @PutMapping("/{productId}")
    public BasicResponse<ProductResponse> update(@LoginValue long userId,
                                                 @PathVariable long productId,
                                                 @RequestBody ProductSaveRequest updateRequest) {
        productService.update(productId, updateRequest, userId);
        ProductResponse productUpdateResponse = productService.getPage(productId, userId);

        return BasicResponse.<ProductResponse>builder()
                .success(true)
                .message("상품 수정")
                .apiStatus(20000)
                .data(productUpdateResponse)
                .httpStatus(HttpStatus.CREATED)
                .build();
    }

    @Operation(
            summary = "상품 관심 상품 등록/해제  상품의 상태를 변경할 수 있다",
            tags = "products",
            description = "사용자는상품을 과 관심상품 / 해제 할수 있다 또는 특정 상품의 상태를 변경할 수 있다."
    )
    @LoginCheck
    @PatchMapping("{productId}")
    public BasicResponse<ProductLikeResponse> changeLike(@RequestBody StatusOrLikeRequest request,
                                                         @PathVariable long productId,
                                                         @LoginValue long userId) {

        if (request.getStatus() == null) {  //like
            productService.changeLike(productId, userId, request.getIsLiked());
        } else {
            productService.changeStatus(productId, userId, request.getStatus());
        }

        return BasicResponse.<ProductLikeResponse>builder()
                .success(true)
                .message("사용자는상품을 과 관심상품 / 해제 할수 있다.")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();
    }

//    @Operation(
//            summary = "사용자는 특정 상품의 상태를 변경할 수 있다",
//            tags = "products",
//            description = "사용자는상품을 사용자는 특정 상품의 상태를 변경할 수 있다."
//    )
//    @LoginCheck
//    @PatchMapping("/status/{productId}")
//    public BasicResponse<ProductStatusResponse> changeStatus(@RequestBody StatusRequest statusRequest,
//                                                             @PathVariable long productId,
//                                                             @LoginValue long userId) {
//        productService.changeStatus(productId, userId, statusRequest);
//
//        return BasicResponse.<ProductStatusResponse>builder()
//                .success(true)
//                .message("사용자는상품을 사용자는 특정 상품의 상태를 변경할 수 있다")
//                .apiStatus(20000)
//                .httpStatus(HttpStatus.OK)
//                .build();
//    }


    @Operation(
            summary = "상품 디테일 페이지",
            tags = "products",
            description = "사용자는 단일 상품을 조회할 수 있다."
    )
    @LoginCheck
    @GetMapping("/{productId}")
    public BasicResponse<ProductResponse> readDetail(@PathVariable long productId) {

        ProductResponse detailPage = productService.getDetailPage(productId);

        return BasicResponse.<ProductResponse>builder()
                .success(true)
                .message("상품 디테일 페이지")
                .apiStatus(20000)
                .data(detailPage)
                .httpStatus(HttpStatus.OK)
                .build();
    }

    @Operation(
            summary = "상품 삭제",
            tags = "products",
            description = "사용자는 단일 상품 삭제 가능합니다.."
    )
    @LoginCheck
    @DeleteMapping("/{productId}")
    public BasicResponse deleteProduct(@LoginValue long userId, @PathVariable long productId) {
        productService.delete(userId, productId);

        return BasicResponse.builder()
                .success(true)
                .message("상품 삭제")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();

    }
}
