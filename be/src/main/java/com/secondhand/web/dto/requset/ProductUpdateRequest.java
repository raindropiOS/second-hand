package com.secondhand.web.dto.requset;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class ProductUpdateRequest {

    @NotNull
    private String title;
    @NotNull
    private String content;
    @NotNull
    private Long categoryId;
    @NotNull
    private Integer price;
    @NotNull
    private Long townId;
    private String productImages;
}
