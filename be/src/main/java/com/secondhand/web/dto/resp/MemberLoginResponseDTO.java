package com.secondhand.web.dto.resp;

import com.secondhand.oauth.dto.OAuthMemberInfoDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberLoginResponseDTO {

    private final String name;
    private final String jwtToken;

    public static MemberLoginResponseDTO of(final OAuthMemberInfoDTO member, final String jwtToken) {
        return MemberLoginResponseDTO.builder()
                .name(member.getName())
                .jwtToken(jwtToken)
                .build();
    }
}
