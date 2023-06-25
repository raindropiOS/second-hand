package com.secondhand.web.dto.requset;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
public class TownRegisterRequest {
    @NotNull
    private Long townId;
}
