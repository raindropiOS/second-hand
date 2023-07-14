package com.secondhand.oauth.service;

import com.secondhand.oauth.UserAgent;
import com.secondhand.oauth.exception.UnknownUserAgentException;
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

    public String getClientId(String userAgent) {
        if (UserAgent.IOS == UserAgent.fromUserAgentDtoValidationUserAgent(userAgent)) {
            return iOSClientId;
        }
        if (UserAgent.WEB == UserAgent.fromUserAgentDtoValidationUserAgent(userAgent)) {
            return webClientId;
        }
        throw new UnknownUserAgentException();
    }

    public String getClientSecret(String userAgent) {
        if (UserAgent.IOS == UserAgent.fromUserAgentDtoValidationUserAgent(userAgent)) {
            return iOSClientSecret;
        }
        if (UserAgent.WEB == UserAgent.fromUserAgentDtoValidationUserAgent(userAgent)) {
            return webClientSecret;
        }
        throw new UnknownUserAgentException();
    }
}
