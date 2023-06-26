package com.secondhand.web.dto.requset;

import lombok.Getter;

@Getter
public class ProductSearchCondition {
    private Long townId;
    private Long categoryId;
    private boolean isLiked;
}
