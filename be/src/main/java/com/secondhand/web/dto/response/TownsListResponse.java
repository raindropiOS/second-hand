package com.secondhand.web.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class TownsListResponse {

    private final List<TownResponse> towns;

}
