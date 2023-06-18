package com.secondhand.web.contoroller;

import com.secondhand.domain.town.TownService;
import com.secondhand.util.Message;
import com.secondhand.web.dto.response.MemberLoginResponse;
import com.secondhand.web.dto.response.MemberTownInfoResponse;
import com.secondhand.web.dto.response.TownDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
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

    @Operation(
            summary = "전체 동네 목록을 조회",
            tags = "towns",
            description = "사용자는 전체 동네 목록을 볼수 있다.."
    )
    @GetMapping
    public ResponseEntity<Message<List<TownDTO>>> read() {
        List<TownDTO> townList = townService.findByAll();

        log.debug("전체 동네 목록을 가져온다 = {}", townList);
        List.of(new TownDTO(1L, "서울 강남구 역삼1동"),
                new TownDTO(1L, "서울 강남구 개포1동"),
                new TownDTO(1L, "서울 강남구 역삼2동"));

        Message message = Message.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .data(townList)
                .build();

        return ResponseEntity.ok(message);
    }


    //TODO : 등록을 숫자로가지고한다? 수정필요
    @Operation(
            summary = "상용자 동네 등록",
            tags = "towns",
            description = "사용자는 동네를 등록할 수있다."
    )
    @PostMapping
    public ResponseEntity<Message<MemberLoginResponse>> registerTown(@RequestBody long townId) {
        townService.save(townId);

        Message message = Message.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(message);
    }

    @Operation(
            summary = "사용자가 등록한 동네.",
            tags = "towns",
            description = "사용자는 특정 동네를 가져올 수있다."
    )
    @GetMapping("/member")
    public ResponseEntity<Message<MemberTownInfoResponse>> viewMember() {
        MemberTownInfoResponse memberTownInfoResponseDTO = townService.findByLoginId();
        log.debug("사용자가 등록한 동네를 가져올수 있다  = {}", memberTownInfoResponseDTO);

        Message message = Message.builder()
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
    public ResponseEntity<Message> delete(@PathVariable long townId) {
        townService.delete(townId);
        log.debug("사용자는 특정 동네를 삭제 할수 있다. = {}");

        Message message = Message.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(message);
    }
}
