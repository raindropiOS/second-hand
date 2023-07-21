package com.secondhand.exception.token;

import com.secondhand.exception.ouath.OAuthException;

public class RefreshTokenTimeException extends OAuthException {
    public RefreshTokenTimeException() {
        super("RefreshToken 토큰을 찾을수 없습니다.");
    }
}
