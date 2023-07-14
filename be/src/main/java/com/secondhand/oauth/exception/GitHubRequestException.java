package com.secondhand.oauth.exception;

public class GitHubRequestException  extends OAuthException {
    public GitHubRequestException() {
        super("깃허브 request 실패.");
    }
}
