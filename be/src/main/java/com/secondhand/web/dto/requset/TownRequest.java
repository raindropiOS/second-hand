package com.secondhand.web.dto.requset;

import lombok.Getter;
import reactor.util.annotation.Nullable;

import javax.validation.constraints.NotNull;

@Getter
public class TownRequest {

    @NotNull
    private Long mainTownId;
    @Nullable
    private Long subTownId;
}
