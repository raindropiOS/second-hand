package com.secondhand.domain.product;

public enum Status {
    SELLING(0),
    RESERVING(1),
    SOLD(2);

    private final int value;

    Status(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
