package com.secondhand.domain.member;

import com.secondhand.domain.interested.Interested;
import com.secondhand.domain.town.Town;
import com.secondhand.oauth.dto.OAuthInfoResponse;
import com.secondhand.web.dto.requset.JoinRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
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
    private String oauthProvider;

    @ManyToOne
    @JoinColumn(name = "main_town_id")
    private Town mainTown;

    @ManyToOne
    @JoinColumn(name = "sub_town_id")
    private Town subTown;

    @OneToMany(mappedBy = "member")
    private Set<Interested> interesteds = new HashSet<>();


    public static Member create(OAuthInfoResponse memberInfo, final String jwtToken) {
        return Member.builder()
                .loginName(memberInfo.getNickname())
                .memberToken(jwtToken)
                .imgUrl(memberInfo.getAvatarUrl())
                .memberEmail(memberInfo.getEmail())
                .oauthProvider(memberInfo.getOAuthProvider().name())
                .build();
    }

    public static Member create(JoinRequest joinRequest, final String jwtToken) {
        return Member.builder()
                //TODO 닉네임 필요없지않나?
                .loginName("감자")
                .memberToken(jwtToken)
                .imgUrl("감자")
                .memberEmail(joinRequest.getMemberEmail())
                .oauthProvider("일반")
                .build();
    }

    public Member update(OAuthInfoResponse memberInfo, final String jwtToken) {
        this.loginName = memberInfo.getNickname();
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

    public void createToken(String refreshToken) {
        this.memberToken = refreshToken;
    }
}
