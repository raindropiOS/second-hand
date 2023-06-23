package com.secondhand.domain.image;

import com.secondhand.domain.product.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Entity
@Table(name = "PRODUCT_IMG")
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_img_id")
    private Long id;

    @NotNull
    private String imgUrl;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public Image(String imageUrl) {
        this.imgUrl = imageUrl;
    }
}
