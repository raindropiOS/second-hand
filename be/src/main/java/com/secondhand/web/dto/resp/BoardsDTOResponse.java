package com.secondhand.web.dto.resp;


import com.secondhand.domain.product.Status;
import com.secondhand.domain.product.CountInfo;
import lombok.*;

@Getter
@Builder
public class BoardsDTOResponse {

    private String title;
    private String town;
    private String createdAt;
    private String price;
    private Status status;
    private CountInfo countInfo;
    private String img;
}
