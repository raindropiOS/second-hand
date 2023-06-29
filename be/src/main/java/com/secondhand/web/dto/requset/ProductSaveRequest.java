package com.secondhand.web.dto.requset;

import lombok.Getter;
import lombok.ToString;


@Getter
@ToString
public class ProductSaveRequest {
    private String title;
    private String content;
    private Long categoryId;
    private Integer price;
    private Long townId;
    private String productImages;
}
