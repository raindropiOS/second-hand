package com.secondhand.oauth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GiHubService {

    @Value("${OAUTH_GITHUB_CLIENT_ID}")
    private String clientId;

    @Value("${OAUTH_GITHUB_CLIENT_SECRET}")
    private String clientSecret;

    public String getClientId() {
        return clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }
}
