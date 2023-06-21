package com.secondhand.service;

import com.secondhand.domain.member.Member;
import lombok.Builder;

@Builder
public class MemberResponse {

    private String name;
    private String imgUrl;

    public static MemberResponse of(final Member member) {
        return MemberResponse.builder()
                .name(member.getMemberId())
                .imgUrl(member.getImagUrl())
                .build();
    }
}
