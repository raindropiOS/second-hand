package com.secondhand.web.dto.response;

import com.secondhand.domain.login.Token;
import lombok.Getter;

@Getter
public class ResponseTokens {

    private final Token token;

    public ResponseTokens(Token token) {
        this.token = token;
    }
}
