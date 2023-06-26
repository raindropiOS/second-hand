package com.secondhand.domain.town;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Bean;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
