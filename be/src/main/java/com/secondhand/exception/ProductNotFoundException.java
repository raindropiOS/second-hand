package com.secondhand.exception;

public class ProductNotFoundException extends ElementNotFoundException {

    public ProductNotFoundException() {
        super("상품을  찾을수 없습니다.");
    }
}
