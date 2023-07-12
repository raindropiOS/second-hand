package com.secondhand.oauth;

import com.secondhand.oauth.dto.AccessTokenResponseDTO;
import com.secondhand.oauth.dto.OAuthInfoResponse;
import com.secondhand.oauth.dto.req.OAuthLoginParams;
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

    public OAuthInfoResponse request(OAuthLoginParams params) {
        Oauth client = clients.get(params.oAuthProvider());
        AccessTokenResponseDTO token = client.getToken(params);
        return client.getUserInfo(String.valueOf(token));
    }
}
