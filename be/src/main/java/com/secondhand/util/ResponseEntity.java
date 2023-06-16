package com.secondhand.util;

import lombok.Getter;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.util.Assert;
import org.springframework.util.MultiValueMap;

@Getter
public class ResponseEntity<T> extends HttpEntity<T> {
    private HttpStatus status;

    public ResponseEntity(@Nullable T body, @Nullable MultiValueMap<String, String> headers, HttpStatus status) {
        super(body, headers);
        Assert.notNull(status, "HttpStatus must not be null");
        this.status = status;
    }

    public ResponseEntity(HttpStatus status) {
        this.status = status;
    }

    public static <T> ResponseEntity<T> ok() {
        return status(HttpStatus.OK);
    }

    public static <T> ResponseEntity<T> notFound() {
        return status(HttpStatus.NOT_FOUND);
    }

    public static <T> ResponseEntity<T> status(HttpStatus status) {
        return new ResponseEntity<>(status);
    }
}