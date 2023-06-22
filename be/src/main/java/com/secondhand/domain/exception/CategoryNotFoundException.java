package com.secondhand.domain.exception;

public class CategoryNotFoundException extends ElementNotFoundException {

    public CategoryNotFoundException() {
        super("카테고리 를 찾을수 없습니다.");
    }
}
