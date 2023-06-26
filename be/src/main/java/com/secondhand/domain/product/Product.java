package com.secondhand.domain.product;

import com.secondhand.domain.categorie.Category;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.town.Town;
import com.secondhand.util.BaseTimeEntity;
import com.secondhand.web.dto.requset.ProductSaveRequest;
import com.secondhand.web.dto.requset.ProductUpdateRequest;
import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Product extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    private String title;
    private String content;
    private Integer price;
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;
    private Integer countView;
    private Integer countLike;
    private String thumbnailUrl;
    private boolean deleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "town_id")
    private Town towns;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
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
                .countLike(0)
                .countView(0)
                .status(Status.SELLING)
                .member(member)
                .build();
    }

    public void update(ProductUpdateRequest updateRequest, Category category, Town town) {
        this.title = updateRequest.getTitle();
        this.content = updateRequest.getContent();
        this.price = updateRequest.getPrice();
        this.thumbnailUrl = updateRequest.getProductImages();
        this.category = category;
        this.towns = town;
    }
}
