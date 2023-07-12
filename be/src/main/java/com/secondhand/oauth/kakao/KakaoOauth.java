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
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


@Component
@RequiredArgsConstructor
public class KakaoOauth implements Oauth {

    private final WebClient webClient;
    private final Logger logger = LoggerFactory.getLogger(KakaoOauth.class);

    @Value("${OAUTH_KAKAO_CLIENT_API_URL}")
    private java.lang.String apiUrl;
    @Value("${OAUTH_KAKAO_CLIENT_AUTH_URL}")
    private java.lang.String authUrl;

    @Value("${OAUTH_KAKAO_REDIRECT_URL}")
    private java.lang.String redirectUrl;
    @Value("${OAUTH_KAKAO_CLIENT_ID}")
    private java.lang.String clientId;

    @Override
    public OAuthProvider oAuthProvider() {
        return OAuthProvider.KAKAO;
    }

    @Override
    public String getToken(OAuthLoginParams params) {
        java.lang.String code = ((KakaoRequestCode) params).getAuthorizationCode();
        KakaoRequestBody body = KakaoRequestBody.builder()
                .grantType("authorization_code")
                .clientId(clientId)
                .redirectUri(redirectUrl)
                .code(code)
                .build();
        logger.debug("requestBodyDTO = {}", body);

        String accessToken = webClient.post()
                .uri(apiUrl)
                .accept(MediaType.APPLICATION_FORM_URLENCODED)
                .bodyValue(body)
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError, error -> Mono.error(KakoRequestException::new))
                .bodyToMono(String.class)
                .blockOptional()
                .orElseThrow(AccessTokenNotFoundException::new);

        logger.debug("accessTokenResponseDTO = {}", accessToken);

        return accessToken;
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
