package com.secondhand.exception;

public class MemberNotFoundException extends ElementNotFoundException {

    public MemberNotFoundException() {
        super("유저를 찾을수 없습니다.");
    }
}
