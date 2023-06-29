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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final GitHubOauth oauth;
    private final JwtService jwtService;
    private final MemberRepository memberRepository;


    @Transactional
    public MemberLoginResponse login(String code) {
        //TODO  authorization code 를 받는다
        AccessTokenResponseDTO token = oauth.getToken(code);
        log.debug("token access 토큰 = {}", token);
        OAuthMemberInfoDTO memberInfo = oauth.getUserInfo(token.getAccessToken());
        log.debug("token access 토큰 으로 부터받은 회원정보 = {}", memberInfo);

        // TODO: 이미 있는 멤버라면 토큰을 업데이트 해주고 아니라면 새로만든다
        if (MemberExists(memberInfo)) {
            Member member = findMemberByMemberName(memberInfo.getLogin());
            Member updateMember = memberRepository.save(member.update(memberInfo, token.getAccessToken()));
            log.debug("기존에 있던 member 토큰 업데이트 = {}", updateMember.getId());
            String jwtToken = jwtService.createToken(updateMember);
            log.debug("jwtToken = {}", jwtToken);
            return MemberLoginResponse.of(updateMember, jwtToken);
        }

        //TODO: db컬럼에 토큰을 저장해야하나?
        Member member = memberRepository.save(Member.create(memberInfo, token.getAccessToken()));
        String jwtToken = jwtService.createToken(member);
        
        log.debug("jwt token = {}", jwtToken);
        log.debug("새로운 맴버 생성 = {}", member);
        return MemberLoginResponse.of(member, jwtToken);
    }

    private boolean MemberExists(OAuthMemberInfoDTO userInfo) {
        //TODO : 토큰을 받은 후 깃허브로 부터 받은 정보가 DB에 저장하거나 있는 정보인지 체크한다.
        log.debug("userInfo = {}", userInfo.getLogin());
        return memberRepository.findByLoginName(userInfo.getLogin()).isPresent();
    }

    public void logout(long userId) {
        Member member = findMemberById(userId);
        member.removeToken();
        memberRepository.save(member);
    }


    public MemberResponse getUserInfo(long userId) {
        return MemberResponse.from(findMemberById(userId));
    }

    public Member findMemberById(long userId) {
        return memberRepository.findById(userId).orElseThrow(MemberNotFoundException::new);
    }

    public Member findMemberByMemberName(String memberName) {
        return memberRepository.findByLoginName(memberName).orElseThrow(MemberNotFoundException::new);
    }
}
