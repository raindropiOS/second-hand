package com.secondhand.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.secondhand.domain.member.MemberController;
import com.secondhand.oauth.dto.req.AccessTokenRequestBodyDTO;
import com.secondhand.oauth.dto.AccessTokenResponseDTO;
import com.secondhand.oauth.dto.OAuthMemberInfoDTO;
import com.secondhand.oauth.exception.AccessTokenNotFoundException;
import com.secondhand.oauth.exception.GitHubRequestException;
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

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Component
public class GitHubOauth implements Oauth {

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
    public AccessTokenResponseDTO getToken(String code) throws IOException, InterruptedException {
        AccessTokenRequestBodyDTO requestBodyDTO = AccessTokenRequestBodyDTO.builder()
                .clientId(giHubService.getClientId())
                .clientSecret(giHubService.getClientSecret())
                .code(code)
                .build();
        logger.debug("requestBodyDTO = {}", requestBodyDTO);

        return webClient.post()
                .uri(url)
                .accept(MediaType.APPLICATION_JSON)
                .bodyValue(requestBodyDTO)
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError, error -> Mono.error(GitHubRequestException::new))
                .bodyToMono(AccessTokenResponseDTO.class)
                .blockOptional()
                .orElseThrow(AccessTokenNotFoundException::new);
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
