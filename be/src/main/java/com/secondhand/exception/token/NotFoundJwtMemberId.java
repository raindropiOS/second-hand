package com.secondhand.exception.token;

import com.secondhand.exception.ElementNotFoundException;

public class NotFoundJwtMemberId  extends ElementNotFoundException {

    public NotFoundJwtMemberId() {
        super("토큰에 있는 유저id를 찾을수 없습니다.");
    }
}
