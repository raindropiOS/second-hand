package com.secondhand.domain.member;

import com.secondhand.domain.interested.Interested;
import com.secondhand.domain.town.Town;
import com.secondhand.oauth.dto.OAuthMemberInfoDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String loginName;
    private String memberEmail;
    private String memberToken;
    private String imgUrl;

    @ManyToOne
    @JoinColumn(name = "main_town_id")
    private Town mainTown;

    @ManyToOne
    @JoinColumn(name = "sub_town_id")
    private Town subTown;

    @OneToMany(mappedBy = "member")
    private Set<Interested> interesteds = new HashSet<>();


    public static Member create(OAuthMemberInfoDTO memberInfo, final String jwtToken) {
        return Member.builder()
                .loginName(memberInfo.getLogin())
                .memberToken(jwtToken)
                .imgUrl(memberInfo.getAvatarUrl())
                .memberEmail("aaa@naver.com")
                .build();
    }

    public Member update(OAuthMemberInfoDTO memberInfo, final String jwtToken) {
        this.loginName = memberInfo.getLogin();
        this.imgUrl = memberInfo.getAvatarUrl();
        this.memberToken = jwtToken;
        return this;
    }

    public void removeToken() {
        this.memberToken = null;
    }

    public void changeTown(Town town) {
        this.mainTown = town;
    }

    public void updateTowns(Town mainTown, Town subTown) {
        this.mainTown = mainTown;
        this.subTown = subTown;
    }

    public void updateMainTowns(Town mainTown) {
        this.mainTown = mainTown;
    }

    public boolean checkProductIsMine(long id) {
        if (this.getId() == id) {
            return true;
        }
        return false;
    }
}
