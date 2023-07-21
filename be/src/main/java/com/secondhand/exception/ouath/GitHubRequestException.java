package com.secondhand.exception.ouath;

public class GitHubRequestException  extends OAuthException {
    public GitHubRequestException() {
        super("깃허브 request 실패.");
    }
}
