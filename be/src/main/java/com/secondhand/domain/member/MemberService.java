package com.secondhand.domain.member;

import com.secondhand.dto.MemberLoginResponseDTO;
import com.secondhand.oauth.dto.OAuthMemberInfoDTO;
import com.secondhand.oauth.Oauth;
import com.secondhand.oauth.dto.AccessTokenResponseDTO;
import com.secondhand.oauth.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final Oauth oauth;
    private final JwtService jwtService;


    @Transactional
    public MemberLoginResponseDTO login(String code) throws IOException, InterruptedException {
        //TODO  authorization code 를 받는다
        AccessTokenResponseDTO token = oauth.getToken(code);
        OAuthMemberInfoDTO memberInfoDTO = oauth.getUserInfo(token.getAccessToken());
        // TODO: 멤버를 저장후 보여준다
        // Member member = memberRepository.save();
        if (checkLoginMember(memberInfoDTO)) {
        }
        String jwtToken = jwtService.createToken(memberInfoDTO);

        return MemberLoginResponseDTO.of(memberInfoDTO, jwtToken);
    }

    private boolean checkLoginMember(OAuthMemberInfoDTO userInfo) {
        //TODO : 토큰을 받은 후 깃허브로 부터 받은 정보가 DB에 저장하거나 있는 정보인지 체크한다.
        return true;
    }
}
