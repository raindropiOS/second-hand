package com.secondhand.web.dto.requset;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductStateRequest {
    private Integer state;
}
