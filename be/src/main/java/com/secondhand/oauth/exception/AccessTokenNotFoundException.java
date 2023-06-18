package com.secondhand.oauth.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class AccessTokenNotFoundException extends OAuthException{
    public AccessTokenNotFoundException() {
        super("Access 토큰을 찾을수 없습니다.");
    }
}
