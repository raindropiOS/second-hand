package com.secondhand.oauth.dto;

import com.secondhand.oauth.OAuthProvider;

public interface  OAuthInfoResponse {
    String getNickname();
    String getAvatarUrl();

    String getEmail();

    OAuthProvider getOAuthProvider();
}
