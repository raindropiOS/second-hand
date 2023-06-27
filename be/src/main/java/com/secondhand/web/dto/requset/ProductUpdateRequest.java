package com.secondhand.web.dto.requset;

import lombok.Getter;


@Getter
public class ProductUpdateRequest {

    private String title;
    private String content;
    private Long categoryId;
    private Integer price;
    private Long townId;
    private String productImages;
}
