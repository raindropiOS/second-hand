package com.secondhand.exception;

public class ImageUploadFailException extends RuntimeException {
    public ImageUploadFailException(String message) {
        super(message);
    }
}
