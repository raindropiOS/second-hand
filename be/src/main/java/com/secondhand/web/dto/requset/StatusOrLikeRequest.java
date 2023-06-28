package com.secondhand.web.dto.requset;

import lombok.Getter;
import reactor.util.annotation.Nullable;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Getter
public class StatusOrLikeRequest {
    @Nullable
    private Boolean isLiked;
    @Min(0)
    @Max(2)
    @Nullable
    private Integer status;
}
