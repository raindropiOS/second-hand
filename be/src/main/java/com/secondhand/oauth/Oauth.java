package com.secondhand.oauth;

import com.secondhand.oauth.dto.AccessTokenResponseDTO;

import java.io.IOException;

public interface Oauth {
    AccessTokenResponseDTO getToken(String code) throws IOException, InterruptedException;

    OAuthMemberInfoDTO getUserInfo(String accessToken) throws IOException, InterruptedException;
}
