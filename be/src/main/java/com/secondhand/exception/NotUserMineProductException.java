package com.secondhand.exception;

public class NotUserMineProductException extends ElementNotFoundException {

    public NotUserMineProductException() {
        super("당신 상품이 아닙니다");
    }
}
