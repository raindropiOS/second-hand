package com.secondhand.domain.town;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Town {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "town_id")
    private Long id;

    @Column(length = 45, nullable = false)
    private String city;

    @Column(length = 45, nullable = false)
    private String county;

    @Column(length = 45, nullable = false)
    private String district;
}
