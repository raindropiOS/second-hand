package com.secondhand.web.controller;

import com.secondhand.login.LoginCheck;
import com.secondhand.login.LoginValue;
import com.secondhand.oauth.dto.req.GithubRequestCode;
import com.secondhand.oauth.dto.req.KakaoRequestCode;
import com.secondhand.service.MemberResponse;
import com.secondhand.service.MemberService;
import com.secondhand.util.BasicResponse;
import com.secondhand.web.dto.requset.RequestCode;
import com.secondhand.web.dto.response.MemberLoginResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    //TODO: 이 부분은 소셜 Oauth 방식의 로그인 , 기본 이메일, 비밀번호 방식의 회원가입 후 로그인이 필요해보인다.
    @Operation(
            summary = "깃허브 로그인",
            tags = "members",
            description = "사용자 깃허브를 통한 로그인"
    )
    @PostMapping("/auth/login")
    public BasicResponse<MemberLoginResponse> login(@RequestBody GithubRequestCode code) throws IOException, InterruptedException {
        log.debug("프론트로 부터 받은 코드 = {}", code);
        MemberLoginResponse memberResponseDTO = memberService.login(code);

        return BasicResponse.send("깃허브 로그인", memberResponseDTO);
    }

    @Operation(
            summary = "카카오 로그인",
            tags = "members",
            description = "사용자 카카오를 통한 로그인"
    )
    @PostMapping("/auth/kakao/login")
    public BasicResponse<MemberLoginResponse> kakaoLogin(@RequestBody KakaoRequestCode params) {
        log.debug("프론트로 부터 받은 코드 = {}", params);
        MemberLoginResponse memberResponseDTO = memberService.login(params);

        return BasicResponse.send("카카오 로그인", memberResponseDTO);
    }


    @Operation(
            summary = "로그아웃",
            tags = "members",
            description = "사용자 로그아웃."
    )
    @LoginCheck
    @GetMapping("/auth/logout")
    public BasicResponse logout(@LoginValue long userId) {
        log.debug("로그아웃 요청");
        memberService.logout(userId);

        return BasicResponse.builder()
                .success(true)
                .message("로그아웃")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();
    }

    @Operation(
            summary = "사용자의 정보를 가져온다",
            tags = "members",
            description = "사용자의 id를 통해 사용자 정보를 가져온다."
    )
    @LoginCheck
    @GetMapping("/members")
    public BasicResponse<MemberResponse> info(@LoginValue long userId) {
        log.debug("사용자 id = {} ", userId);
        MemberResponse userInfo = memberService.getUserInfo(userId);

        return BasicResponse.send("사용자 정보를 가져온다", userInfo);
    }
}
