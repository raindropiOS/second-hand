package com.secondhand.oauth;

import com.secondhand.oauth.dto.OAuthInfoResponse;
import com.secondhand.oauth.dto.req.OAuthLoginParams;
import com.secondhand.oauth.dto.req.UserAgentDTO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class RequestOAuthInfoService {
    private final Map<OAuthProvider, Oauth> clients;

    public RequestOAuthInfoService(List<Oauth> clients) {
        this.clients = clients.stream().collect(
                Collectors.toUnmodifiableMap(Oauth::oAuthProvider, Function.identity())
        );
    }

    public OAuthInfoResponse request(OAuthLoginParams params, String userAgent) {
        Oauth client = clients.get(params.oAuthProvider());
        String token = client.getToken(params, userAgent);
        return client.getUserInfo(token);
    }
}
