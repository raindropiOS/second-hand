package com.secondhand.domain.product;

import com.secondhand.domain.categorie.Category;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.town.Town;
import com.secondhand.web.dto.requset.ProductSaveRequest;
import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
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
    private String thumbnailUrl;

    @ManyToOne
    @JoinColumn(name = "town_id")
    private Town towns;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public static Product create(ProductSaveRequest requestInfo, Member member, Category category, Town town) {
        return Product.builder()
                .title(requestInfo.getTitle())
                .content(requestInfo.getContent())
                .price(requestInfo.getPrice())
                .thumbnailUrl(requestInfo.getProductImages())
                .towns(town)
                .category(category)
                .member(member)
                .build();
    }
}
