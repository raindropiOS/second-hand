package com.secondhand.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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


    public static <T> BasicResponse<T> send(String message, T memberResponseDTO) {
        return BasicResponse.<T>builder()
                .success(true)
                .message(message)
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .data(memberResponseDTO)
                .build();
    }

    public static <T> BasicResponse<T> send(String message) {
        return BasicResponse.<T>builder()
                .success(true)
                .message(message)
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();
    }
}
