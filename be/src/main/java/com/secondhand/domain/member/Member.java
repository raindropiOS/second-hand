package com.secondhand.domain.member;

import com.secondhand.domain.town.Town;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    private Town mainTown;

    @ManyToOne
    @JoinColumn(name = "sub_town_id")
    private Town subTown;
}
