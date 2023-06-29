package com.secondhand.web.dto.requset;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Getter
public class ProductSaveRequest {
    private String title;
    private String content;
    private Long categoryId;
    private Integer price;
    private Long townId;
    private String productImages;
}
