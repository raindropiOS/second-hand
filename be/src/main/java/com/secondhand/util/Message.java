package com.secondhand.util;

import com.secondhand.domain.board.dto.BoardsDTOResponse;
import lombok.Data;

@Data
public class Message {

    private StatusEnum status;
    private String message;
    private Object data;

    public Message() {
        this.status = StatusEnum.BAD_REQUEST;
        this.data = null;
        this.message = null;
    }

    private Message create(Object object) {
        Message message = new Message();
        message.setStatus(StatusEnum.OK);
        message.setMessage("성공 코드");
        message.setData(object);
        return message;
    }
}