package com.secondhand.web.dto.response;

import com.secondhand.domain.product.CountInfo;
import com.secondhand.domain.product.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private boolean isMine;
    private Seller seller;
    private Integer status;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private ProductCategoryResponse category;
    private Integer price;
    private CountInfo countInfo;
    private boolean isLiked;
    private String[] imgUrls;


    public static ProductResponse of(boolean isMine, Product product) {
        return ProductResponse.builder()
                .isMine(isMine)
                .seller(new Seller(product.getMember().getLoginName(), product.getMember().getId()))
                .status(product.getStatus().getValue())
                .title(product.getTitle())
                .content(product.getContent())
                .createdAt(LocalDateTime.now())
                .category(new ProductCategoryResponse(product.getCategory().getCategoryId(), product.getCategory().getName()))
                .price(product.getPrice())
                .countInfo(
                        CountInfo.builder()
                                .chatCount(0)
                                .likeCount(product.getCountLike())
                                .viewCount(product.getCountView())
                                .build()
                )
                .isLiked(true)
                .imgUrls(product.changeProductImages())
                .build();
    }
}
