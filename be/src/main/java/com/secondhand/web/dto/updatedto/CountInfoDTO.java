package com.secondhand.web.dto.updatedto;

import lombok.Getter;

@Getter
public class CountInfoDTO {
    private Integer chatCount;
    private Integer likeCount;

    public CountInfoDTO(Integer chatCount, Integer likeCount) {
        this.chatCount = chatCount;
        this.likeCount = likeCount;
    }
}
