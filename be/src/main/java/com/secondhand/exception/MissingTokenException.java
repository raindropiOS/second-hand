package com.secondhand.exception;

public class MissingTokenException extends RuntimeException {

    public MissingTokenException() {
        super("Missing token.");
    }

    public MissingTokenException(String message) {
        super(message);
    }

    public MissingTokenException(String message, Throwable cause) {
        super(message, cause);
    }
}
