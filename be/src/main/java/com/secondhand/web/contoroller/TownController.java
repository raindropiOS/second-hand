package com.secondhand.web.contoroller;

import com.secondhand.service.MemberService;
import com.secondhand.service.ProductService;
import com.secondhand.service.TownService;
import com.secondhand.util.BasicResponse;
import com.secondhand.web.dto.response.MemberTownInfoResponse;
import com.secondhand.web.dto.response.TownResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/towns")
@RequiredArgsConstructor
public class TownController {

    private final Logger log = LoggerFactory.getLogger(TownController.class);
    private final TownService townService;
    private final MemberService memberService;
    private final ProductService productService;

    @Operation(
            summary = "전체 동네 목록을 조회",
            tags = "towns",
            description = "사용자는 전체 동네 목록을 볼수 있다.."
    )
    @GetMapping
    public BasicResponse<List<TownResponse>> read() {
        List<TownResponse> townList = townService.findByAll();
        log.debug("전체 동네 목록을 가져온다 = {}", townList);

        return BasicResponse.<List<TownResponse>>builder()
                .message("성공")
                .success(true)
                .data(townList)
                .httpStatus(HttpStatus.OK)
                .apiStatus(20000)
                .build();
    }

    @Operation(
            summary = "사용자가 등록한 동네.",
            tags = "towns",
            description = "사용자는 특정 동네를 가져올 수있다."
    )
    @GetMapping("/member")
    public ResponseEntity<BasicResponse<MemberTownInfoResponse>> viewMember() {
        MemberTownInfoResponse memberTownInfoResponseDTO = townService.findByLoginId();
        log.debug("사용자가 등록한 동네를 가져올수 있다  = {}", memberTownInfoResponseDTO);

        BasicResponse message = BasicResponse.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .data(memberTownInfoResponseDTO)
                .build();

        return ResponseEntity.ok(message);
    }

    @Operation(
            summary = "동네 삭제",
            tags = "board",
            description = "사용자는 동네를 삭제할 수 있다."
    )
    @DeleteMapping("/townId")
    public ResponseEntity<BasicResponse> delete(@PathVariable long townId) {
        townService.delete(townId);
        log.debug("사용자는 특정 동네를 삭제 할수 있다. = {}");

        BasicResponse message = BasicResponse.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(message);
    }
}
