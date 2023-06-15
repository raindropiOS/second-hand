package com.secondhand.oauth.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class GitHubRequestException  extends OAuthException {
    public GitHubRequestException() {
        super("깃허브 request 실패.");
    }
}
