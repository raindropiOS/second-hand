package com.secondhand.exception.token;

import com.secondhand.exception.ouath.OAuthException;

public class AccessTokenNotFoundException extends OAuthException {
    public AccessTokenNotFoundException() {
        super("Access 토큰을 찾을수 없습니다.");
    }
}
