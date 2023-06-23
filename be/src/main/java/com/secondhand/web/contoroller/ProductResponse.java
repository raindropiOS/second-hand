package com.secondhand.web.contoroller;

import com.secondhand.domain.categorie.Category;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.product.CountInfo;
import com.secondhand.domain.product.Product;
import com.secondhand.domain.product.Status;
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
    private Member seller;
    private Status status;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private Category category;
    private Integer price;
    private CountInfo countInfo;
    private boolean isLiked;
    private String[] imgUrls;


    public static ProductResponse of(boolean isMine, Product product) {
        return ProductResponse.builder()
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
}
