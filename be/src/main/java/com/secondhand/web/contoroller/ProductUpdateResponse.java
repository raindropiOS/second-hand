package com.secondhand.web.contoroller;

import com.secondhand.domain.categorie.Category;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.product.CountInfo;
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
public class ProductUpdateResponse {
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

}
