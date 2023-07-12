package com.secondhand.oauth.kakao;

import com.secondhand.oauth.OAuthProvider;
import com.secondhand.oauth.Oauth;
import com.secondhand.oauth.dto.OAuthInfoResponse;
import com.secondhand.oauth.dto.req.KakaoRequestCode;
import com.secondhand.oauth.dto.req.OAuthLoginParams;
import com.secondhand.oauth.exception.AccessTokenNotFoundException;
import com.secondhand.oauth.exception.GitHubRequestException;
import com.secondhand.oauth.exception.GitHubUserInfoNotFoundException;
import com.secondhand.oauth.exception.KakoRequestException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


@Component
@RequiredArgsConstructor
public class KakaoOauth implements Oauth {

    private final WebClient webClient;
    private final Logger logger = LoggerFactory.getLogger(KakaoOauth.class);

    @Value("${OAUTH_KAKAO_CLIENT_API_URL}")
    private String apiUrl;
    @Value("${OAUTH_KAKAO_CLIENT_AUTH_URL}")
    private String authUrl;

    @Value("${OAUTH_KAKAO_REDIRECT_URL}")
    private String redirectUrl;
    @Value("${OAUTH_KAKAO_CLIENT_ID}")
    private String clientId;

    @Override
    public OAuthProvider oAuthProvider() {
        return OAuthProvider.KAKAO;
    }

    @Override
    public String getToken(OAuthLoginParams params) {
        String code = ((KakaoRequestCode) params).getAuthorizationCode();

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", clientId);
        body.add("redirect_uri", redirectUrl);
        body.add("code", code);

        logger.debug("body = {}", body);

        KakoTokens kakoTokens = webClient.post()
                .uri(apiUrl)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .bodyValue(body)
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError, error -> Mono.error(KakoRequestException::new))
                .bodyToMono(KakoTokens.class)
                .blockOptional()
                .orElseThrow(AccessTokenNotFoundException::new);

        logger.debug("accessTokenResponseDTO = {}", kakoTokens);

        return kakoTokens.getAccessToken();
    }

    @Override
    public OAuthInfoResponse getUserInfo(java.lang.String accessToken) {
        return webClient.get()
                .uri(authUrl)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, "token" + " " + accessToken)
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError, error -> Mono.error(GitHubRequestException::new))
                .bodyToMono(OAuthInfoResponse.class)
                .blockOptional()
                .orElseThrow(GitHubUserInfoNotFoundException::new);
    }
}
