package com.secondhand.web.dto.requset;

import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotNull;


@Getter
@ToString
public class ProductUpdateRequest {

    private String title;
    private String content;
    @NotNull
    private Long categoryId;
    private Integer price;
    @NotNull
    private Long townId;
    private String productImages;
}
