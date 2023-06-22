package com.secondhand.web.contoroller;

import com.secondhand.login.LoginCheck;
import com.secondhand.login.LoginValue;
import com.secondhand.service.ProductService;
import com.secondhand.util.BasicResponse;
import com.secondhand.web.dto.requset.FilterRequest;
import com.secondhand.web.dto.requset.ProductLikeResponse;
import com.secondhand.web.dto.requset.ProductSaveRequest;
import com.secondhand.web.dto.requset.ProductUpdateRequest;
import com.secondhand.web.dto.response.ProductDTO;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @Operation(
            summary = "상품 10개씩 리스트",
            tags = "products",
            description = "사용자는 상품을 10개씩 상품 리스프로 볼 수 있다.."
    )
    @GetMapping
    public BasicResponse<List<ProductDTO>> search(FilterRequest filterRequestDTO) {
        return BasicResponse.<List<ProductDTO>>builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();
    }

    @Operation(
            summary = "관심 목록을 카테고리 별로 확인",
            tags = "products",
            description = "사용자는 자시의 관심 목록을 카테고리 뱔로 확인 가능."
    )
    @GetMapping("/like")
    public ResponseEntity<BasicResponse<List<ProductDTO>>> productLikeCategoryView() {
        BasicResponse message = BasicResponse.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();

        return new ResponseEntity<>(message, null, HttpStatus.OK);
    }

    @Operation(
            summary = "판매/세일 중인 상품",
            tags = "products",
            description = "사용자는 세일/판매 중인 상품을 볼수 있다."
    )
    @GetMapping("/sales")
    public ResponseEntity<BasicResponse<List<ProductDTO>>> productSalesView() {
        BasicResponse message = BasicResponse.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();

        return new ResponseEntity<>(message, null, HttpStatus.OK);
    }

    @Operation(
            summary = "상품 등록",
            tags = "products",
            description = "사용자는 단일 상품을 등록할 수 있다."
    )
    @LoginCheck
    @PostMapping
    public BasicResponse save(@LoginValue long userId,
                              @RequestBody ProductSaveRequest productSaveRequest) {

        productService.save(userId, productSaveRequest);
        return BasicResponse.builder()
                .success(true)
                .message("상품 등록")
                .apiStatus(20000)
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
                                                 @RequestBody ProductUpdateRequest updateRequest) {
        productService.update(productId, updateRequest);
        ProductResponse productUpdateResponse = productService.updateResponse(productId, userId);

        return BasicResponse.<ProductResponse>builder()
                .success(true)
                .message("상품 수정")
                .apiStatus(20000)
                .data(productUpdateResponse)
                .httpStatus(HttpStatus.CREATED)
                .build();
    }

    @Operation(
            summary = "상품 관심 상품 등록/해제",
            tags = "products",
            description = "사용자는상품을 과 관심상품 / 해제 할수 있다.."
    )
    @PatchMapping("/{productId}")
    public ResponseEntity<BasicResponse<ProductLikeResponse>> checkLike(@PathVariable long productId) {
        ProductLikeResponse dto = new ProductLikeResponse();
        BasicResponse message = BasicResponse.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .data(dto)
                .build();

        return new ResponseEntity<>(message, null, HttpStatus.OK);
    }


    @Operation(
            summary = "상품 디테일 페이지",
            tags = "products",
            description = "사용자는 단일 상품을 조회할 수 있다."
    )
    @LoginCheck
    @GetMapping("/{productId}")
    public BasicResponse<ProductResponse> readDetail(@LoginValue long userId, @PathVariable long productId) {

        ProductResponse detailPage = productService.getDetailPage(userId, productId);

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
