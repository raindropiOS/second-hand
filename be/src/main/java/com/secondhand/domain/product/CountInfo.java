package com.secondhand.domain.product;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CountInfo {
    private Integer chatCount;
    private Integer likeCount;
    private Integer viewCount;

    public CountInfo(Integer countLike) {
        this.likeCount = countLike;
    }
}
