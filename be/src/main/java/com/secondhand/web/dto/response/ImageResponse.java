package com.secondhand.web.dto.response;

import com.secondhand.domain.image.Image;
import lombok.Getter;


@Getter
public class ImageResponse {
    private final String image;

    public ImageResponse(String image) {
        this.image = image;
    }
}
