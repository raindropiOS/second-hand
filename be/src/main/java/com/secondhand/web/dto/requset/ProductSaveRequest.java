package com.secondhand.web.dto.requset;

import lombok.Getter;


@Getter
public class ProductSaveRequest {
    private String title;
    private String content;
    private Long categoryId;
    private Long townId;
    private Integer price;
    private String productImages;
}
