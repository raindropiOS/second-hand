package com.secondhand.web.dto.response;

import com.secondhand.domain.product.CountInfo;
import com.secondhand.domain.product.Product;
import com.secondhand.web.dto.updatedto.CountInfoDTO;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
public class ProductListResponse {

    private Long productId;
    private String title;
    private TownResponse town;
    private LocalDateTime createdAt;
    private Integer status;
    private Integer price;
    private CountInfoDTO countInfo;

    private String imgUrl;


    public ProductListResponse(Product product) {
        this.productId = product.getId();
        this.title = product.getTitle();
        this.town = new TownResponse(product.getTowns());
        this.createdAt = product.getCreatedAt();
        this.status = product.getStatus().getValue();
        this.price = product.getPrice();
        this.countInfo = new CountInfoDTO(0, product.getCountLike());
        this.imgUrl = product.getThumbnailUrl();
    }

    public static List<ProductListResponse> fromList(List<Product> page) {
        List<ProductListResponse> productList = new ArrayList<>();
        for (Product product : page) {
            ProductListResponse response = new ProductListResponse(product);
            productList.add(response);
        }
        return productList;
    }

}
