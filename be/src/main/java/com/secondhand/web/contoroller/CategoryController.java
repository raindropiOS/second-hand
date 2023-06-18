package com.secondhand.web.contoroller;

import com.secondhand.util.Message;
import com.secondhand.web.dto.response.CategoryDTO;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.Entity;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    @Operation(
            summary = "모든 카테고리 목록",
            tags = "categories",
            description = "사용자는 모든 카테고리 목록을 가져올 수 있다."
    )
    @GetMapping("/test")
    public ResponseEntity<Message> view() {
        List<CategoryDTO> categoryDTOList = List.of(new CategoryDTO(1L, "비디오", "url경로"),
                new CategoryDTO(1L, "비디오", "url경로"),
                new CategoryDTO(1L, "비디오", "url경로"));

        Message message = Message.builder()
                .success(true)
                .message("")
                .apiStatus(20000)
                .httpStatus(HttpStatus.OK)
                .data(categoryDTOList)
                .build();

        return ResponseEntity.ok()
                .body(message);
    }
}
