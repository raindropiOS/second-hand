package com.secondhand.web.dto.response;

import com.secondhand.domain.town.Town;
import lombok.Getter;

@Getter
public class TownResponse {
    private final Long townId;
    private final String name;

    public TownResponse(Town towns) {
        this.townId = towns.getTownId();
        this.name = String.format("%s %s %s",
                towns.getCity(), towns.getCounty(), towns.getDistrict());
    }
}

