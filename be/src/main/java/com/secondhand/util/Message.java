package com.secondhand.util;

import lombok.*;
import org.springframework.http.HttpStatus;

@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Message<T> {

    private boolean success;
    private HttpStatus httpStatus;
    private int apiStatus;
    private T data;
    private String message;
}
