package com.secondhand.dto;


import com.secondhand.domain.board.Status;
import com.secondhand.domain.board.CountInfo;
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
