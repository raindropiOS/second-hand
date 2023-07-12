package com.secondhand.oauth.dto.req;

import com.secondhand.oauth.OAuthProvider;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class GithubRequestCode implements OAuthLoginParams {
    private String authorizationCode;

    @Override
    public OAuthProvider oAuthProvider() {
        return OAuthProvider.GITHUB;
    }
}

