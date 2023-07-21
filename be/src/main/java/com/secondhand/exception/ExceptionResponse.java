package com.secondhand.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ExceptionResponse {
    private Integer code;
    private String message;
    private boolean success;
    private String details;
}
