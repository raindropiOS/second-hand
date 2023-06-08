package com.secondhand.domain.board;

import com.secondhand.domain.board.dto.BoardsDTOResponse;
import com.secondhand.domain.board.dto.CountInfo;
import com.secondhand.util.Message;
import com.secondhand.util.ResponseEntity;
import com.secondhand.util.StatusEnum;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import static com.secondhand.domain.board.Status.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/boards")
public class BoardController {

    @Operation(
            summary = "메인 페이지 상품 리스트",
            tags = "board",
            description = "사용자는 상품 리스트를 볼 수 있다."
    )
    @GetMapping("/{townId}/{pageNum}")
    public ResponseEntity<Message> allBoardList(@PathVariable long townId, @PathVariable long pageNum) {

        BoardsDTOResponse boardsListResponse = BoardsDTOResponse.builder()
                .title("파랑 선풍기")
                .town("역삼 1동")
                .createdAt("2시간 전")
                .price("24,500원")
                .img("이미지")
                .status(SELL)
                .countInfo(new CountInfo(1L, 2L))
                .build();
        Message message = new Message();

        message.setStatus(StatusEnum.OK);
        message.setMessage("성공 코드");
        message.setData(boardsListResponse);
        return new ResponseEntity<>(message, null, HttpStatus.OK);
    }

    @GetMapping
    public String allBoardList() {
        return "hello world";
    }
}
