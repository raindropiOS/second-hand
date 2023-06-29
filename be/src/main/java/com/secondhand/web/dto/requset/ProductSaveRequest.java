package com.secondhand.web.dto.requset;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@ToString
public class ProductSaveRequest {
    @NotNull
    private String title;
    @NotNull
    private String content;
    @NotNull
    private Long categoryId;
    @NotNull
    private Integer price;
    @NotNull
    private Long townId;
    @NotNull
    private List<MultipartFile> productImages;
}
