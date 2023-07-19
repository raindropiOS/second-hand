package com.secondhand.domain.oauth.dto;

import com.secondhand.domain.oauth.OAuthProvider;

public interface  OAuthInfoResponse {
    String getNickname();
    String getAvatarUrl();

    String getEmail();

    OAuthProvider getOAuthProvider();
}
