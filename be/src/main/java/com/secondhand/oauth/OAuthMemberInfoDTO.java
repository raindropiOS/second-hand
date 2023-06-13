package com.secondhand.oauth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OAuthMemberInfoDTO {
    private Long id;
    private String name;
    @JsonProperty("avatar_url")
    private String avatarUrl;
}
