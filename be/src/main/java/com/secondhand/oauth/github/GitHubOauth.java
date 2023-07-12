package com.secondhand.oauth.github;

import com.secondhand.oauth.OAuthApiClient;
import com.secondhand.oauth.OAuthProvider;
import com.secondhand.oauth.dto.AccessTokenResponseDTO;
import com.secondhand.oauth.dto.OAuthInfoResponse;
import com.secondhand.oauth.dto.req.AccessTokenRequestBodyDTO;
import com.secondhand.oauth.dto.req.GithubRequestCode;
import com.secondhand.oauth.dto.req.OAuthLoginParams;
import com.secondhand.oauth.exception.AccessTokenNotFoundException;
import com.secondhand.oauth.exception.GitHubRequestException;
import com.secondhand.oauth.exception.GitHubUserInfoNotFoundException;
import com.secondhand.oauth.service.GiHubService;
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
public class GitHubOauth implements OAuthApiClient {

    private final GiHubService giHubService;
    private final WebClient webClient;
    private final Logger logger = LoggerFactory.getLogger(GitHubOauth.class);

    private final String url;
    private final String redirectUrl;

    public GitHubOauth(GiHubService giHubService,
                       WebClient webClient,
                       @Value("${OAUTH_GITHUB_URL}") String url,
                       @Value("${OAUTH_GITHUB_REDIRECT_URL}") String redirectUrl) {
        this.giHubService = giHubService;
        this.webClient = webClient;
        this.url = url;
        this.redirectUrl = redirectUrl;
    }

    @Override
    public OAuthProvider oAuthProvider() {
        return OAuthProvider.GITHUB;
    }

    @Override
    public AccessTokenResponseDTO getToken(OAuthLoginParams params) {
        GithubRequestCode code = (GithubRequestCode) params;
        AccessTokenRequestBodyDTO requestBodyDTO = AccessTokenRequestBodyDTO.builder()
                .clientId(giHubService.getClientId())
                .clientSecret(giHubService.getClientSecret())
                .code(code.getAuthorizationCode())
                .build();
        logger.debug("requestBodyDTO = {}", requestBodyDTO);


        AccessTokenResponseDTO accessTokenResponseDTO = webClient.post()
                .uri(url)
                .accept(MediaType.APPLICATION_JSON)
                .bodyValue(requestBodyDTO)
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError, error -> Mono.error(GitHubRequestException::new))
                .bodyToMono(AccessTokenResponseDTO.class)
                .blockOptional()
                .orElseThrow(AccessTokenNotFoundException::new);

        logger.debug("accessTokenResponseDTO = {}", accessTokenResponseDTO);

        return accessTokenResponseDTO;
    }

    @Override
    public OAuthInfoResponse getUserInfo(String accessToken) {
        return webClient.get()
                .uri(redirectUrl)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, "token" + " " + accessToken)
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError, error -> Mono.error(GitHubRequestException::new))
                .bodyToMono(OAuthInfoResponse.class)
                .blockOptional()
                .orElseThrow(GitHubUserInfoNotFoundException::new);
    }
}
