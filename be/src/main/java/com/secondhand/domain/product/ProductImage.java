package com.secondhand.domain.product;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String imgUrl;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
