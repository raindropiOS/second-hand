package com.secondhand.oauth;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AccessTokenRequestBodyDTO {

    private final String clientId;
    private final String clientSecret;
    private final String code;
}
