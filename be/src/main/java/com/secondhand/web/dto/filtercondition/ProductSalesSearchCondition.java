package com.secondhand.web.dto.filtercondition;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Getter
@AllArgsConstructor
public class ProductSalesSearchCondition {
    @Min(0)
    @Max(2)
    private Integer status;
}
