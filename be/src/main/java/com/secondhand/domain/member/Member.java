package com.secondhand.domain.member;

import com.secondhand.domain.interested.Interested;
import com.secondhand.domain.product.Product;
import com.secondhand.domain.town.Towns;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String memberId;
    @Column
    private String imagUrl;

    @ManyToOne
    @JoinColumn(name = "main_town_id")
    private Towns mainTown;

    @ManyToOne
    @JoinColumn(name = "sub_town_id")
    private Towns subTown;
}
