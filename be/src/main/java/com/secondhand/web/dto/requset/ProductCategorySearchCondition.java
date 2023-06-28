package com.secondhand.web.dto.requset;

import lombok.Getter;

@Getter
public class ProductCategorySearchCondition {
    private Long categoryId;
    private Boolean isLiked;
}
