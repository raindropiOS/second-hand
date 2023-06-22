package com.secondhand.web.contoroller;

import com.secondhand.login.LoginCheck;
import com.secondhand.login.LoginValue;
import com.secondhand.service.MemberResponse;
import com.secondhand.service.MemberService;
import com.secondhand.service.TownService;
import com.secondhand.util.BasicResponse;
import com.secondhand.web.dto.response.MemberLoginResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final TownService townService;

    @Operation(
            summary = "깃허브 로그인",
            tags = "member",
            description = "사용자 깃허브를 통한 로그인"
    )
    @PostMapping("/auth/login")
    public BasicResponse<MemberLoginResponse> login(@RequestBody RequestCode code) throws IOException, InterruptedException {
        log.debug("프론트로 부터 받은 코드 = {}", code);
        MemberLoginResponse memberResponseDTO = memberService.login(code.getAuthorizationCode());

        return BasicResponse.<MemberLoginResponse>builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .data(memberResponseDTO)
                .build();
    }

    @Operation(
            summary = "로그아웃",
            tags = "member",
            description = "사용자 로그아웃."
    )
    @LoginCheck
    @GetMapping("/auth/logout")
    public ResponseEntity<BasicResponse<MemberLoginResponse>> logout(@LoginValue long userId) {
        memberService.logout(userId);

        BasicResponse message = BasicResponse.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(message);
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

        return BasicResponse.<MemberResponse>builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .data(userInfo)
                .build();
    }
}
