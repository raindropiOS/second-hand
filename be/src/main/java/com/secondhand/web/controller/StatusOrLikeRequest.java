package com.secondhand.web.controller;

import lombok.Getter;

@Getter
public class StatusOrLikeRequest {
    private Boolean isLiked;
    private Integer status;
}
