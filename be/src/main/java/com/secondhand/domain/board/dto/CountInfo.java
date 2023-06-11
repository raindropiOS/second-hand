package com.secondhand.domain.board.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CountInfo {
    private Long chatCount;
    private Long likeCount;
}
