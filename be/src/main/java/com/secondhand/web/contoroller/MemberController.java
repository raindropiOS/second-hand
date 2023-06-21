package com.secondhand.web.contoroller;

import com.secondhand.login.LoginCheck;
import com.secondhand.login.LoginValue;
import com.secondhand.service.MemberService;
import com.secondhand.service.TownService;
import com.secondhand.util.BasicResponse;
import com.secondhand.web.dto.response.MemberLoginResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
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
    public BasicResponse<MemberLoginResponse> login(@RequestParam String code) throws IOException, InterruptedException {
        log.debug("프론트로 부터 받은 코드 = {}", code);
        MemberLoginResponse memberResponseDTO = memberService.login(code);

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
    public BasicResponse<MemberLoginResponse> info(@LoginValue long userId) {
        log.debug("사용자 id = {} ", userId);
        memberService.getUserInfo(userId);

        return BasicResponse.<MemberLoginResponse>builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();
    }

    //TODO : 등록을 숫자로가지고한다? 수정필요
    @Operation(
            summary = "사용자의 처음 동네 등록",
            tags = "members",
            description = "사용자의 화원가입할 때 메인, 서브  동네를 등록할 수있다."
    )
    @PostMapping("/members/towns")
    public BasicResponse registerTown(@RequestBody long townId) {
        return BasicResponse.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();
    }

    @Operation(
            summary = "사용자의 동네 등록",
            tags = "members",
            description = "사용자의 메인, 서브 동네를 수정할 수 있다."
    )
    @PatchMapping("/members/towns")
    public BasicResponse updateTown(@RequestBody long townId) {
        return BasicResponse.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();
    }
}
