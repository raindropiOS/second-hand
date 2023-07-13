package com.secondhand.web.dto.requset;

import lombok.Getter;

import javax.validation.constraints.Email;

@Getter
public class SignupSocialRequest {

    @Email
    private String email;
}
