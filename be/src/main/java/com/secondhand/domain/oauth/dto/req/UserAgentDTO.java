package com.secondhand.domain.oauth.dto.req;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.secondhand.domain.oauth.UserAgent;
import lombok.Setter;

@Setter
public class UserAgentDTO {
    @JsonProperty("User-Agent")
    private String userAgent;
    public UserAgent fromUserAgent() {
        return UserAgent.fromUserAgentDtoValidationUserAgent(userAgent);
    }
}
