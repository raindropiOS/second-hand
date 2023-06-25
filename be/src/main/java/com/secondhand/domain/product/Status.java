package com.secondhand.domain.product;

import com.secondhand.domain.exception.StatusNotFoundException;

public enum Status {
    SELLING(0, "SELLING"),
    RESERVING(1, "RESERVING"),
    SOLD(2, "SOLD");

    private final int value;
    private final String stringValue;

    Status(int value, String stringValue) {
        this.value = value;
        this.stringValue = stringValue;
    }

    public int getValue() {
        return value;
    }

    @Override
    public String toString() {
        return stringValue;
    }

    public static Status getStatusByValue(int value) {
        for (Status status : values()) {
            if (status.getValue() == value) {
                return status;
            }
        }
        throw new StatusNotFoundException("일치하는 상태가 없습니다: " + value);
    }
}
