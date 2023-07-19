package com.secondhand.exception;

public class RefreshTokenNotFoundException extends RuntimeException {

    public RefreshTokenNotFoundException() {
        super("토큰이 잘못되었습니다.");
    }
}
