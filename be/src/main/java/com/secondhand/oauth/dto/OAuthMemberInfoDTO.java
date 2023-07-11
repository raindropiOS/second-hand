package com.secondhand.oauth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class OAuthMemberInfoDTO {
    private Long id;
    private String name;
    private String login;
    private String avatarUrl;
//    private String email;
//
//    @JsonProperty("email")
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    @JsonProperty("email")
//    public String getEmail() {
//        return email;
//    }
}
