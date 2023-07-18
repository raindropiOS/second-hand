package com.secondhand.domain.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class MemberPassword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_password_id")
    private Long id;

    private String memberPassword;

    public MemberPassword(String memberPassword) {
        this.memberPassword = memberPassword;
    }
}
