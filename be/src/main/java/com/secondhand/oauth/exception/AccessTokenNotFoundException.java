package com.secondhand.oauth.exception;

public class AccessTokenNotFoundException extends OAuthException{
    public AccessTokenNotFoundException() {
        super("Access 토큰을 찾을수 없습니다.");
    }
}
