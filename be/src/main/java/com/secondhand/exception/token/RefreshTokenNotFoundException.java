package com.secondhand.exception.token;

public class RefreshTokenNotFoundException extends RuntimeException {

    public RefreshTokenNotFoundException() {
        super("토큰을 찾을수 없습니다..");
    }
}
