package com.secondhand.web.dto.resp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
public class TownsListResponseDTO {

    private final List<TownDTO> towns;

}
