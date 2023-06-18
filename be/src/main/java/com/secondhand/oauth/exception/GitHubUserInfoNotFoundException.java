package com.secondhand.oauth.exception;

public class GitHubUserInfoNotFoundException extends OAuthException {
    public GitHubUserInfoNotFoundException() {
        super("깃허브로부터 유저정보를 찾을수 없습니다");
    }

}
