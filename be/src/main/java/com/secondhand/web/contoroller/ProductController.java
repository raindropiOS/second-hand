package com.secondhand.web.contoroller;

import com.secondhand.domain.product.CountInfo;
import com.secondhand.domain.product.ProductService;
import com.secondhand.web.dto.req.FilterRequestDTO;
import com.secondhand.web.dto.req.ProductLikeResponseDTO;
import com.secondhand.web.dto.req.ProductSaveRequestDTO;
import com.secondhand.web.dto.req.ProductUpdateRequestDTO;
import com.secondhand.web.dto.resp.BoardsDTOResponse;
import com.secondhand.util.Message;
import com.secondhand.web.dto.resp.ProductDTO;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.secondhand.domain.product.Status.SELL;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/products")
public class ProductController {

    private final ProductService productService;

    @Operation(
            summary = "상품 10개씩 리스트",
            tags = "products",
            description = "사용자는 상품을 10개씩 상품 리스프로 볼 수 있다.."
    )
    @GetMapping
    public ResponseEntity<Message<List<ProductDTO>>> search(FilterRequestDTO filterRequestDTO) {
        Message message = Message.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();

        return new ResponseEntity<>(message, null, HttpStatus.OK);
    }

    @Operation(
            summary = "관심 목록을 카테고리 별로 확인",
            tags = "products",
            description = "사용자는 자시의 관심 목록을 카테고리 뱔로 확인 가능."
    )
    @GetMapping("/like")
    public ResponseEntity<Message<List<ProductDTO>>> productLikeCategoryView() {
        Message message = Message.builder()
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
    public ResponseEntity<Message<List<ProductDTO>>> productSalesView() {
        Message message = Message.builder()
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
    @PostMapping
    public ResponseEntity<Message> save(@RequestBody ProductSaveRequestDTO requestDTO) {
        Message message = Message.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();

        return new ResponseEntity<>(message, null, HttpStatus.OK);
    }

    @Operation(
            summary = "상품 수정",
            tags = "products",
            description = "사용자는 단일 상품을 수정할 수 있다."
    )
    @PutMapping("/{productId}")
    public ResponseEntity<Message> update(@PathVariable long productId,
                                          @RequestBody ProductUpdateRequestDTO requestDTO) {
        Message message = Message.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();

        return new ResponseEntity<>(message, null, HttpStatus.OK);
    }

    @Operation(
            summary = "상품 관심 상품 등록/해제",
            tags = "products",
            description = "사용자는상품을 과 관심상품 / 해제 할수 있다.."
    )
    @PatchMapping("/{productId}")
    public ResponseEntity<Message<ProductLikeResponseDTO>> checkLike(@PathVariable long productId) {
        ProductLikeResponseDTO dto = new ProductLikeResponseDTO();
        Message message = Message.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .data(dto)
                .build();

        return new ResponseEntity<>(message, null, HttpStatus.OK);
    }

    @Operation(
            summary = "메인 페이지 상품 리스트",
            tags = "board",
            description = "사용자는 상품 리스트를 볼 수 있다."
    )
    @GetMapping("/{townId}/{pageNum}")
    public ResponseEntity<Message> allProductList(@PathVariable long townId, @PathVariable long pageNum) {

        //TODO create는 DTO 에서 해준다.
        BoardsDTOResponse boardsListResponse = BoardsDTOResponse.builder()
                .title("파랑 선풍기")
                .town("역삼 1동")
                .createdAt("2시간 전")
                .price("24,500원")
                .img("이미지")
                .status(SELL)
                .countInfo(new CountInfo(1L, 2L))
                .build();

        BoardsDTOResponse boardsListResponse2 = BoardsDTOResponse.builder()
                .title("빨강 선풍기")
                .town("강남 1동")
                .createdAt("2시간 전")
                .price("24,500원")
                .img("이미지")
                .status(SELL)
                .countInfo(new CountInfo(1L, 2L))
                .build();

        BoardsDTOResponse boardsListResponse3 = BoardsDTOResponse.builder()
                .title("노랑 선풍기")
                .town("대치 1동")
                .createdAt("2시간 전")
                .price("24,500원")
                .img("이미지")
                .status(SELL)
                .countInfo(new CountInfo(1L, 2L))
                .build();

        BoardsDTOResponse boardsListResponse4 = BoardsDTOResponse.builder()
                .title("초록 선풍기")
                .town("역삼 1동")
                .createdAt("2시간 전")
                .price("24,500원")
                .img("이미지")
                .status(SELL)
                .countInfo(new CountInfo(1L, 2L))
                .build();
        List<BoardsDTOResponse> boardsDTOResponseList = new ArrayList<>();
        boardsDTOResponseList.add(boardsListResponse);
        boardsDTOResponseList.add(boardsListResponse2);
        boardsDTOResponseList.add(boardsListResponse3);
        boardsDTOResponseList.add(boardsListResponse4);


        if (boardsListResponse == null) {
            Message message = Message.builder()
                    .success(false)
                    .message("실패")
                    .apiStatus(20000)
                    .httpStatus(HttpStatus.NOT_FOUND)
                    .data(boardsDTOResponseList)
                    .build();
            return new ResponseEntity<>(message, null, HttpStatus.NOT_FOUND);
        }
        Message message = Message.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .data(boardsDTOResponseList)
                .build();
        return new ResponseEntity<>(message, null, HttpStatus.OK);
    }

    @Operation(
            summary = "단일 상품 리스트",
            tags = "board",
            description = "사용자는 단일 상품을 볼 수 있다."
    )
    @GetMapping("/{productId}")
    public ResponseEntity<Message> productDetail(@PathVariable long productId) {

        //TODO create는 DTO 에서 해준다.
        BoardsDTOResponse boardsListResponse = BoardsDTOResponse.builder()
                .title("파랑 선풍기")
                .town("역삼 1동")
                .createdAt("2시간 전")
                .price("24,500원")
                .img("이미지")
                .status(SELL)
                .countInfo(new CountInfo(1L, 2L))
                .build();

        Message message = Message.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .data(boardsListResponse)
                .build();

        return new ResponseEntity<>(message, null, HttpStatus.OK);
    }

    @Operation(
            summary = "상품 삭제",
            tags = "products",
            description = "사용자는 단일 상품 삭제 가능합니다.."
    )
    @DeleteMapping("/{productId}")
    public ResponseEntity<Message> deleteProduct(@PathVariable long productId) {

        //TODO create는 DTO 에서 해준다.
        BoardsDTOResponse boardsListResponse = BoardsDTOResponse.builder()
                .title("파랑 선풍기")
                .town("역삼 1동")
                .createdAt("2시간 전")
                .price("24,500원")
                .img("이미지")
                .status(SELL)
                .countInfo(new CountInfo(1L, 2L))
                .build();

        Message message = Message.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .data(boardsListResponse)
                .build();

        return new ResponseEntity<>(message, null, HttpStatus.OK);
    }
}
