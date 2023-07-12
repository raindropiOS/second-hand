package com.secondhand.oauth;

import com.secondhand.oauth.dto.AccessTokenResponseDTO;
import com.secondhand.oauth.dto.OAuthInfoResponse;
import com.secondhand.oauth.dto.req.OAuthLoginParams;

public interface OAuthApiClient {

    AccessTokenResponseDTO getToken(OAuthLoginParams params);

    OAuthInfoResponse getUserInfo(String accessToken);

    OAuthProvider oAuthProvider();
}
