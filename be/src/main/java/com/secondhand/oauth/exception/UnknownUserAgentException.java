package com.secondhand.oauth.exception;

public class UnknownUserAgentException extends OAuthException {

    public UnknownUserAgentException() {
        super("잘못된 user-Agent 입니다");
    }
}
