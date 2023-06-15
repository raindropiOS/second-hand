package com.secondhand.web.dto.resp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class TownDTO {
    private final Long id;
    private final String name;

//    public static TownDTO of(Towns towns) {
//        return TownDTO.builder()
//                .id(towns.getId())
//                .name(towns.getName())
//                .build();
//    }

}
