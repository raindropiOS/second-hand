package com.secondhand.web.dto.requset;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Getter
@NoArgsConstructor
@ToString
public class ProductSaveRequest {
    private String title;
    private String content;
    private Long categoryId;
    private Integer price;
    private Long townId;
    private String productImages;
}
