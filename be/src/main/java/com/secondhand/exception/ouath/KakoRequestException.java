package com.secondhand.exception.ouath;

public class KakoRequestException extends OAuthException {
    public KakoRequestException() {
        super("카카오 request 실패.");
    }
}
