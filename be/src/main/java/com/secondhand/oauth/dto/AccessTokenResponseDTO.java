package com.secondhand.oauth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class AccessTokenResponseDTO {

    private String accessToken;
    private String tokenType;
    private String scope;
}
