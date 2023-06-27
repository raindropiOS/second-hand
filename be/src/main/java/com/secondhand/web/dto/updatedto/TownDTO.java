package com.secondhand.web.dto.updatedto;

import com.secondhand.domain.town.Town;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TownDTO {

    private Long id;
    private String city;
    private String county;
    private String district;

    public static TownDTO from(Town town) {
        return TownDTO.builder()
                .id(town.getId())
                .city(town.getCity())
                .county(town.getCounty())
                .district(town.getDistrict())
                .build();
    }
}
