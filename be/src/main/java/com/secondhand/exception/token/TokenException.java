package com.secondhand.exception.token;

public class TokenException extends RuntimeException {

    public TokenException() {
        super("예상치 못한 토큰 오류");
    }
}
