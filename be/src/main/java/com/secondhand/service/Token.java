package com.secondhand.service;

import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Token {
    //    private String grantType;
    private String accessToken;
    private String refreshToken;
}
