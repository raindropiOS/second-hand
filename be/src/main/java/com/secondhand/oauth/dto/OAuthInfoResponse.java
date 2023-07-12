package com.secondhand.oauth.dto;

import com.secondhand.oauth.OAuthProvider;

public interface  OAuthInfoResponse {
    String getEmail();
    String getNickname();
    String getAvatarUrl();
    OAuthProvider getOAuthProvider();
}
