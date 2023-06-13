package com.secondhand.oauth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GiHubService {

    private final String clientId;
    private final String clientSecret;

    public GiHubService(@Value("${OAUTH_GITHUB_CLIENT_ID}") String clientId,
                        @Value("${OAUTH_GITHUB_CLIENT_SECRET}") String clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    public String getClientId() {
        return clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }
}
