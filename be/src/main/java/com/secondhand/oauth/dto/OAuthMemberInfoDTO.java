package com.secondhand.oauth.dto;

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
    private String avatarUrl;
}
