package com.secondhand.web.dto.requset;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class LikeRequest {
    @NotNull
    private boolean isLiked;
}
