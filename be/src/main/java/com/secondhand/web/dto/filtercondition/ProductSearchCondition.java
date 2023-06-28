package com.secondhand.web.dto.filtercondition;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class ProductSearchCondition {
//    private final int pageNum;
    private Long townId;
    private Long categoryId;
}
