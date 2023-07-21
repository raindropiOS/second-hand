package com.secondhand.domain.member;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class MemberToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_token_id")
    private Long id;

    private String memberToken;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public MemberToken(String memberToken, Member member) {
        this.memberToken = memberToken;
        this.member = member;
    }

    public void update(String refreshToken, Member member) {
        this.memberToken = refreshToken;
        this.member = member;
    }

    public void removeToken() {
        this.memberToken = null;
    }
}
