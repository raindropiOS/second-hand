//package com.secondhand.domain.product;
//
//import lombok.Getter;
//
//import javax.persistence.*;
//
//@Entity
//@Table(name = "product_img")
//@Getter
//public class ProductImage {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "product_img_id")
//    private Long id;
//
//    @Column
//    private String imgUrl;
//
//    @ManyToOne
//    @JoinColumn(name = "product_id")
//    private Product product;
//
//}
