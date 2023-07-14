package com.secondhand.oauth;

import com.secondhand.oauth.dto.OAuthInfoResponse;
import com.secondhand.oauth.dto.req.OAuthLoginParams;

public interface Oauth {
    OAuthProvider oAuthProvider();

    String getToken(OAuthLoginParams params, String userAgent);

    OAuthInfoResponse getUserInfo(String accessToken);
}
