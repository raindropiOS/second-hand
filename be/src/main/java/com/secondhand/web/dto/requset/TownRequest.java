package com.secondhand.web.dto.requset;

import lombok.Getter;
import reactor.util.annotation.Nullable;


@Getter
public class TownRequest {

    private Long mainTownId;
    @Nullable
    private Long subTownId;
}
