package com.secondhand.domain.member;

import com.secondhand.dto.MemberLoginResponseDTO;
import com.secondhand.util.Message;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @GetMapping("/auth/login")
    public ResponseEntity<Message<MemberLoginResponseDTO>> login(@RequestParam String code) throws IOException, InterruptedException {
        logger.debug("프론트로 부터 받은 코드 = {}", code);
        MemberLoginResponseDTO memberResponseDTO = memberService.login(code);

        Message message = Message.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .data(memberResponseDTO)
                .build();

        return ResponseEntity.ok(message);
    }

    @GetMapping("/")
    public String home() {
        return "hello";
    }
}
