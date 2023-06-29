package com.secondhand.domain.interested;

import com.secondhand.domain.member.Member;
import com.secondhand.domain.product.Product;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "INTERESTED")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Interested {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interested_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private boolean isLiked;


    public static Interested create(Member member, Product product, boolean liked) {
        return Interested.builder()
                .product(product)
                .member(member)
                .isLiked(liked)
                .build();
    }

    public void changeInterested(Interested newInterested, Member member, Product product) {
        newInterested.setMember(member);
        newInterested.setProduct(product);
        newInterested.setLiked(true);
    }
}
