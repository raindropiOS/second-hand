package com.secondhand.web.controller;

import com.secondhand.domain.login.JwtTokenProvider;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Api(tags = "토큰")
@RestController
@RequestMapping("/api/tokens")
@RequiredArgsConstructor
public class TokenController {

    private final JwtTokenProvider jwtService;

//    @PostMapping("/refresh")
//    public BasicResponse<Token> validateRefreshToken() {
//        jwtService.
//    }
}
