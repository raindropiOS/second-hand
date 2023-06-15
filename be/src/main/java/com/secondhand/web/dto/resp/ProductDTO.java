package com.secondhand.web.dto.resp;

import com.secondhand.domain.product.CountInfo;
import com.secondhand.domain.product.Status;
import com.secondhand.web.dto.resp.TownDTO;

public class ProductDTO {
    private Long productId;
    private String title;
    private TownDTO town;
    private Status status;
    private Long price;
    private CountInfo countInfo;
    private String imgUrl;
}
