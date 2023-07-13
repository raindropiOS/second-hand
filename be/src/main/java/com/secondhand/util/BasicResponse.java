package com.secondhand.util;

import com.secondhand.web.dto.response.MemberLoginResponse;
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


    public static <T> BasicResponse<T> send(String message, T memberResponseDTO) {
        return BasicResponse.<T>builder()
                .success(true)
                .message(message)
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .data(memberResponseDTO)
                .build();
    }

    public static <T> BasicResponse send(String message) {
        return BasicResponse.<T>builder()
                .success(true)
                .message(message)
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();
    }
}
