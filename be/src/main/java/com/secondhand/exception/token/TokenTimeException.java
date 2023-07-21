package com.secondhand.exception.token;

import com.secondhand.exception.ouath.OAuthException;

public class TokenTimeException extends OAuthException {
    public TokenTimeException() {
        super("토큰 유효 시간이 만료되었거나 유효하지않습니다.");
    }
}
