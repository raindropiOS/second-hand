package com.secondhand.domain.product;

import com.secondhand.domain.categorie.Category;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.town.Town;
import lombok.Getter;

import javax.persistence.*;

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

    @ManyToOne
    @JoinColumn(name = "town_id")
    private Town towns;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
