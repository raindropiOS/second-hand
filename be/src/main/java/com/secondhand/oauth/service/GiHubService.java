package com.secondhand.oauth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GiHubService {

    @Value("${OAUTH_GITHUB_CLIENT_ID}")
    private String webClientId;

    @Value("${OAUTH_GITHUB_CLIENT_SECRET}")
    private String webClientSecret;

    @Value("${OAUTH_GITHUB_IOS_CLIENT_ID}")
    private String iOSClientId;

    @Value("${OAUTH_GITHUB_IOS_CLIENT_SECRET}")
    private String iOSClientSecret;

    public String getClientId() {
        return webClientId;
    }

    public String getClientSecret() {
        return webClientSecret;
    }
}
