package com.secondhand.domain.oauth.exception;

public class RefreshTokenTimeException extends OAuthException{
    public RefreshTokenTimeException() {
        super("RefreshToken 토큰을 찾을수 없습니다.");
    }
}
