package com.secondhand.web.dto.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Seller {
    private String name;
    private Long memberId;

    public Seller(String name, Long memberId) {
        this.name = name;
        this.memberId = memberId;
    }
}
