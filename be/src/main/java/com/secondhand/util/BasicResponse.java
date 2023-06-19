package com.secondhand.util;

import lombok.*;
import org.springframework.http.HttpStatus;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BasicResponse<T> {

    private boolean success;
    private HttpStatus httpStatus;
    private int apiStatus;
    private T data;
    private String message;
}
