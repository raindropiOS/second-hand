package com.secondhand.web.dto.response;


import com.secondhand.domain.product.Status;
import com.secondhand.domain.product.CountInfo;
import lombok.*;

@Getter
@Builder
public class BoardsResponse {

    private String title;
    private String town;
    private String createdAt;
    private String price;
    private Status status;
    private CountInfo countInfo;
    private String img;
}
