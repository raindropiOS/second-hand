package com.secondhand.oauth.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.secondhand.oauth.OAuthProvider;
import lombok.Getter;
import lombok.ToString;

@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class KakaoInfoResponse implements OAuthInfoResponse {
    private KakaoAccount kakaoAccount;

    @Getter
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class KakaoAccount {
        private KakaoProfile profile;
        private String email;
    }

    @Getter
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class KakaoProfile {
        private String nickname;
    }

    public String getNickname() {
        return kakaoAccount.profile.nickname;
    }

    public OAuthProvider getOAuthProvider() {
        return OAuthProvider.KAKAO;
    }

    @Override
    public String getAvatarUrl() {
        return null;
    }

    @Override
    public String getEmail() {
        return null;
    }

}
