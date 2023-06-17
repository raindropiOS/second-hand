package com.secondhand.domain.town;

import com.secondhand.domain.member.Member;
import com.secondhand.domain.product.Product;
import com.secondhand.util.BaseTimeEntity;
import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
public class Towns extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45, nullable = false)
    private String name;

    @Column(length = 45, nullable = false)
    private String county;

    @Column(length = 45, nullable = false)
    private String district;
}
