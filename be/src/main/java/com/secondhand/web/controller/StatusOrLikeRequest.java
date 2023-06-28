package com.secondhand.web.controller;

import lombok.Getter;

@Getter
public class StatusOrLikeRequest {
    private boolean isLiked;
    private Integer status;
}
