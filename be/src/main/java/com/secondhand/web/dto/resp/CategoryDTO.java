package com.secondhand.web.dto.resp;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CategoryDTO {

    @JsonProperty("categoryId")
    private final Long categoryId;

    @JsonProperty("name")
    private final String name;

    @JsonProperty("imgUrl")
    private final String imgUrl;

    @Builder
    public CategoryDTO(Long categoryId, String name, String imgUrl) {
        this.categoryId = categoryId;
        this.name = name;
        this.imgUrl = imgUrl;
    }
}
