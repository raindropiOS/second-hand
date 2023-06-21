package com.secondhand.web.dto.response;

import com.secondhand.domain.member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberLoginResponse {

    private final String name;
    private final String imagUrl;
    private final String jwtToken;

    public static MemberLoginResponse of(final Member member, final String jwtToken) {
        return MemberLoginResponse.builder()
                .name(member.getMemberName())
                .jwtToken(jwtToken)
                .build();
    }
}
