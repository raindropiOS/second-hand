package com.secondhand.oauth;

import com.secondhand.oauth.dto.AccessTokenResponseDTO;
import com.secondhand.oauth.dto.OAuthMemberInfoDTO;

import java.io.IOException;

public class KakaoOauth implements Oauth {
    @Override
    public AccessTokenResponseDTO getToken(String code) {
        return null;
    }

    @Override
    public OAuthMemberInfoDTO getUserInfo(String accessToken) {
        return null;
    }
}
