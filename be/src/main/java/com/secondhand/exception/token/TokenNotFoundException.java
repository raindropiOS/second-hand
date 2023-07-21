package com.secondhand.exception.token;

public class TokenNotFoundException extends RuntimeException {

    public TokenNotFoundException() {
        super("토큰의 형식이 올바르지 않습니다.");
    }
}

