package com.secondhand.domain.exception;

public class TownNotFoundException extends ElementNotFoundException {

    public TownNotFoundException() {
        super("타운을  찾을수 없습니다.");
    }
}
