package com.secondhand.service;

import com.secondhand.domain.exception.MemberNotFoundException;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.member.MemberRepository;
import com.secondhand.web.dto.response.MemberLoginResponse;
import com.secondhand.oauth.GitHubOauth;
import com.secondhand.oauth.dto.OAuthMemberInfoDTO;
import com.secondhand.oauth.dto.AccessTokenResponseDTO;
import com.secondhand.oauth.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final GitHubOauth oauth;
    private final Logger logger = LoggerFactory.getLogger(MemberService.class);
    private final JwtService jwtService;
    private final MemberRepository memberRepository;


    @Transactional
    public MemberLoginResponse login(String code) {
        //TODO  authorization code 를 받는다
        AccessTokenResponseDTO token = oauth.getToken(code);
        logger.debug("token access 토큰 = {}", token);
        OAuthMemberInfoDTO memberInfoDTO = oauth.getUserInfo(token.getAccessToken());
        logger.debug("token access 토큰 으로 부터받은 회원정보 = {}", memberInfoDTO);
        String jwtToken = jwtService.createToken(memberInfoDTO);

        // TODO: 이미 있는 멤버라면 토큰을 업데이트 해주고 아니라면 새로만든다
        if (MemberExists(memberInfoDTO)) {
            Member member = findMemberById(memberInfoDTO.getId());
            memberRepository.save(member.update(memberInfoDTO, jwtToken));
            return MemberLoginResponse.of(member, jwtToken);
        }
        Member member = memberRepository.save(Member.create(memberInfoDTO, jwtToken));
        return MemberLoginResponse.of(member, jwtToken);
    }

    private boolean MemberExists(OAuthMemberInfoDTO userInfo) {
        //TODO : 토큰을 받은 후 깃허브로 부터 받은 정보가 DB에 저장하거나 있는 정보인지 체크한다.
        return memberRepository.findById(userInfo.getId()).isPresent();
    }

    public void logout(long userId) {
        Member member = findMemberById(userId);
        member.removeToken();
        memberRepository.save(member);
    }

    public MemberResponse getUserInfo(long userId) {
        return MemberResponse.of(findMemberById(userId));
    }


    private Member findMemberById(long userId) {
        return memberRepository.findById(userId).orElseThrow(MemberNotFoundException::new);
    }

}
