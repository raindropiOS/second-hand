package com.secondhand.web.dto.requset;

import lombok.Getter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Getter
public class ProductCategorySearchCondition {
    private Long categoryId;
}
