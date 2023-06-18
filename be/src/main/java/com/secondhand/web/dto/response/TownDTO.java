package com.secondhand.web.dto.response;

import lombok.Getter;

@Getter
public class TownDTO {
    private final Long id;
    private final String name;

    public TownDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
