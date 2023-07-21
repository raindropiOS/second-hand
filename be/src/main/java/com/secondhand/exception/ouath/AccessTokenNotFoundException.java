package com.secondhand.exception.ouath;

public class AccessTokenNotFoundException  extends OAuthException {
    public AccessTokenNotFoundException() {
        super("깃허브 acess토큰 만들기 실패.");
    }
}
