package com.secondhand.oauth.dto.req;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class AccessTokenRequestBodyDTO {

    private final String clientId;
    private final String clientSecret;
    private final String code;
}
