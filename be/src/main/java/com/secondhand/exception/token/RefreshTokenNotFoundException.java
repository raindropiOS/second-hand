package com.secondhand.exception.token;

import com.secondhand.exception.ElementNotFoundException;

public class RefreshTokenNotFoundException extends ElementNotFoundException {

    public RefreshTokenNotFoundException() {
        super("당산에게 일치하는 토큰이 아닙니다!");
    }
}
