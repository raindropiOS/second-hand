package com.secondhand.web.dto.requset;

import com.secondhand.domain.product.Status;
import lombok.Getter;

@Getter
public class ProductSearchCondition {
    private Long townId;
    private Long categoryId;
    private boolean isLiked;
    private Status status;
}
