package com.secondhand.domain.oauth.exception;

public class AccessTokenTimeException extends RuntimeException {

    public AccessTokenTimeException() {
        super("토큰 시간이 만료되었습니다 Refresh 토큰을 입력해주세요");
    }
}
