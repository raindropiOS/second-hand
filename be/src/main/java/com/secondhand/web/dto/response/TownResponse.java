package com.secondhand.web.dto.response;

import lombok.Getter;

@Getter
public class TownResponse {
    private final Long id;
    private final String name;

    public TownResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
