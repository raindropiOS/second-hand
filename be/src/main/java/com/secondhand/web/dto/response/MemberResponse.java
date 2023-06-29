package com.secondhand.web.dto.response;

import com.secondhand.domain.member.Member;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MemberResponse {

    private String name;
    private String imgUrl;

    public static MemberResponse from(final Member member) {
        return MemberResponse.builder()
                .name(member.getLoginName())
                .imgUrl(member.getImgUrl())
                .build();
    }
}
