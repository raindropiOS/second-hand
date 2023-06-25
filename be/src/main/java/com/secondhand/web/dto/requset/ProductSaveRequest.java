package com.secondhand.web.dto.requset;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class ProductSaveRequest {
    @NotNull
    private String title;
    @NotNull
    private String content;
    @NotNull
    private Long categoryId;
    @NotNull
    private Long townId;
    @NotNull
    private Integer price;
    private String productImages;
}
