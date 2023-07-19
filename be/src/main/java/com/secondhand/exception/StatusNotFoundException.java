package com.secondhand.exception;

public class StatusNotFoundException extends ElementNotFoundException {

    public StatusNotFoundException(String s) {
        super("상태를  찾을수 없습니다. " + s);
    }
}

