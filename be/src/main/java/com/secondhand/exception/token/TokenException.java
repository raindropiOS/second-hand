package com.secondhand.exception.token;

public class TokenException extends RuntimeException {

    public TokenException() {
        super("토큰 에서 오류가 발생했습니다");
    }
}
