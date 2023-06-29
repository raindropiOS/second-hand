package com.secondhand.domain.image;

import com.secondhand.domain.product.Product;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "PRODUCT_IMG")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_img_id")
    private Long id;

    @NotNull
    private String imgUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    public Image(String imgUrl, Product product) {
        this.imgUrl = imgUrl;
        this.product = product;
        product.getImages().add(this);
    }

//    public void changeProduct(Product product, String imageUrl) {
//        this.imgUrl = imageUrl;
//        this.product = product;
//        product.getImages().add(this);
//    }
}
