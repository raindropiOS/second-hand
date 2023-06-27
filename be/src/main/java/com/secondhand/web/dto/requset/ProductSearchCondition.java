package com.secondhand.web.dto.requset;

import com.secondhand.domain.product.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class ProductSearchCondition {
    private final int pageNum;
    private Long townId;
    private Long categoryId;
    private boolean isLiked;
    private Status status;
}
