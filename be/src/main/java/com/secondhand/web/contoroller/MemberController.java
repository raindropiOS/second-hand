package com.secondhand.web.contoroller;

import com.secondhand.service.MemberService;
import com.secondhand.service.TownService;
import com.secondhand.util.BasicResponse;
import com.secondhand.web.dto.response.MemberLoginResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final TownService townService;
    private final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @Operation(
            summary = "깃허브 로그인",
            tags = "member",
            description = "사용자 깃허브를 통한 로그인"
    )
    @PostMapping("/auth/login")
    public BasicResponse<MemberLoginResponse> login(@RequestParam String code) throws IOException, InterruptedException {
        logger.debug("프론트로 부터 받은 코드 = {}", code);
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
    @GetMapping("/auth/logout")
    public ResponseEntity<BasicResponse<MemberLoginResponse>> logout() {

        BasicResponse message = BasicResponse.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(message);
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
