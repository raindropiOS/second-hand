package com.secondhand.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.secondhand.oauth.dto.AccessTokenResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Component
public class GitHubOauth implements Oauth {

    private final GiHubService giHubService;

    private final Logger logger = LoggerFactory.getLogger(GitHubOauth.class);
    private final String url;
    private final String redirectUrl;


    public GitHubOauth(
            @Value("${OAUTH_GITHUB_URL}") String url,
            @Value("${OAUTH_GITHUB_REDIRECT_URL}") String redirectUrl,
            GiHubService giHubService) {
        this.giHubService = giHubService;
        this.url = url;
        this.redirectUrl = redirectUrl;
    }

    @Override
    public AccessTokenResponseDTO getToken(String code) throws IOException, InterruptedException {
        AccessTokenRequestBodyDTO requestBodyDTO = AccessTokenRequestBodyDTO.builder()
                .clientId(giHubService.getClientId())
                .clientSecret(giHubService.getClientSecret())
                .code(code)
                .build();

        HttpClient httpClient = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .POST(HttpRequest.BodyPublishers.ofString(new ObjectMapper().writeValueAsString(requestBodyDTO)))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        logger.debug("response = {}", response);
        validateSuccess(response);

        return new ObjectMapper().readValue(response.body(), AccessTokenResponseDTO.class);
    }

    @Override
    public OAuthMemberInfoDTO getUserInfo(String accessToken) throws IOException, InterruptedException {
        HttpClient httpClient = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(redirectUrl))
                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "token" + " " + accessToken)
                .GET()
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        logger.debug("response = {}", response);
        validateSuccess(response);

        return new ObjectMapper().readValue(response.body(), OAuthMemberInfoDTO.class);
    }

    private <T> void validateSuccess(final HttpResponse<T> response) {
        final HttpStatus status = HttpStatus.resolve(response.statusCode());
        if (status == null || status.isError()) {
            logger.warn("URI: {}, STATUS: {}", response.uri(), response.statusCode());
            throw new RuntimeException("요청 처리 실패");
        }
        logger.info("URI: {}, STATUS: {}, BODY : {}, ", response.uri(), response.statusCode(), response.body());
    }
}
