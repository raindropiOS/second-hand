package com.secondhand.domain.categorie;

import com.secondhand.domain.product.Product;
import com.secondhand.util.BaseTimeEntity;
import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
public class Category extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45, nullable = false)
    private String name;

    @Column(length = 200, nullable = false)
    private String imgUrl;

    @OneToMany(mappedBy = "product")
    private List<Product> products;
}
