package com.secondhand.domain.product;

import com.secondhand.domain.categorie.Category;
import com.secondhand.domain.interested.Interested;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.town.Towns;
import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private Integer price;
    private Status status;
    private Integer countView;
    private Integer countLike;
    private Integer thumbnailUrl;

    @OneToMany(mappedBy = "product_img")
    private List<ProductImage> images;

    @OneToMany(mappedBy = "interested")
    private List<Interested> interests;

    @ManyToOne
    @JoinColumn(name = "town_id")
    private Towns towns;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
