package com.secondhand.web.dto.requset;

import lombok.Getter;

@Getter
public class StatusOrLikeRequest {
    private Boolean isLiked;
    private Integer status;
}
