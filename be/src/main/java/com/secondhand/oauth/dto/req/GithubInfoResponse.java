package com.secondhand.oauth.dto.req;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.secondhand.oauth.OAuthProvider;
import com.secondhand.oauth.dto.OAuthInfoResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class GithubInfoResponse implements OAuthInfoResponse {

    @JsonProperty("name")
    private String name;

    @JsonProperty("login")
    private String login;

    @JsonProperty("avatar_url")
    private String avatarUrl;

    @Override
    public String getNickname() {
        return name;
    }

    @Override
    public String getAvatarUrl() {
        return avatarUrl;
    }

    @Override
    public String getEmail() {
        return null;
    }

    @Override
    public OAuthProvider getOAuthProvider() {
        return OAuthProvider.GITHUB;
    }
}
