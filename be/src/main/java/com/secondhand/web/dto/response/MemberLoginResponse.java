package com.secondhand.web.dto.response;

import com.secondhand.oauth.dto.OAuthMemberInfoDTO;
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

    public static MemberLoginResponse of(final OAuthMemberInfoDTO member, final String jwtToken) {
        return MemberLoginResponse.builder()
                .name(member.getName())
                .jwtToken(jwtToken)
                .build();
    }
}
