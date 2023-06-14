package com.secondhand.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.secondhand.oauth.dto.req.AccessTokenRequestBodyDTO;
import com.secondhand.oauth.dto.AccessTokenResponseDTO;
import com.secondhand.oauth.dto.OAuthMemberInfoDTO;
import com.secondhand.oauth.service.GiHubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
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
    @Value("${OAUTH_GITHUB_URL}")
    private String url;
    @Value("${OAUTH_GITHUB_REDIRECT_URL}")
    private String redirectUrl;

    @Autowired
    public GitHubOauth(GiHubService giHubService) {
        this.giHubService = giHubService;
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
        validateSuccess(response);

        return new ObjectMapper().readValue(response.body(), OAuthMemberInfoDTO.class);
    }

    private <T> void validateSuccess(final HttpResponse<T> response) {
        final HttpStatus status = HttpStatus.resolve(response.statusCode());
        if (status == null || status.isError()) {
            throw new RuntimeException("요청 처리 실패");
        }
    }
}
