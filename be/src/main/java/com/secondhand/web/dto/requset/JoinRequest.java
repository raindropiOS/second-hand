package com.secondhand.web.dto.requset;

import lombok.Getter;

@Getter
public class JoinRequest {
    private String memberEmail;
    private String password;
    private Integer[] towns;
}
