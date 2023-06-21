package com.secondhand.domain.member;

import com.secondhand.domain.town.Town;
import com.secondhand.oauth.dto.OAuthMemberInfoDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String memberName;
    private String memberToken;
    @Column
    private String imagUrl;

    @ManyToOne
    @JoinColumn(name = "main_town_id")
    private Town mainTown;

    @ManyToOne
    @JoinColumn(name = "sub_town_id")
    private Town subTown;

    public static Member create(OAuthMemberInfoDTO memberInfo, final String jwtToken) {
        return Member.builder()
                .memberName(memberInfo.getName())
                .memberToken(jwtToken)
                .imagUrl(memberInfo.getAvatarUrl())
                .build();
    }

    public Member update(OAuthMemberInfoDTO memberInfo, final String jwtToken) {
        this.memberName = memberInfo.getName();
        this.imagUrl = memberInfo.getAvatarUrl();
        this.memberToken = jwtToken;
        return this;
    }

    public void removeToken() {
        this.memberToken = null;
    }
}
