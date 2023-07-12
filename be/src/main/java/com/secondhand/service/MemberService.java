package com.secondhand.service;

import com.secondhand.domain.exception.MemberNotFoundException;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.member.MemberRepository;
import com.secondhand.oauth.RequestOAuthInfoService;
import com.secondhand.oauth.dto.OAuthInfoResponse;
import com.secondhand.oauth.dto.req.OAuthLoginParams;
import com.secondhand.oauth.service.JwtService;
import com.secondhand.web.dto.response.MemberLoginResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final RequestOAuthInfoService requestOAuthInfoService;

    @Transactional
    public MemberLoginResponse login(OAuthLoginParams params) {
        //TODO  authorization code 를 받는다
        OAuthInfoResponse oAuthInfoResponse = requestOAuthInfoService.request(params);

        // TODO: 이미 있는 멤버라면 토큰을 업데이트 해주고 아니라면 새로만든다
        if (MemberExists(oAuthInfoResponse)) {
            Member member = findMemberByMemberName(oAuthInfoResponse.getNickname());
            Token jwtToken = jwtService.createToken(member);
            Member updateMember = memberRepository.save(member.update(oAuthInfoResponse, jwtToken.getRefreshToken()));
            log.debug("jwtToken = {}", jwtToken);
            return MemberLoginResponse.of(updateMember, jwtToken);
        }

        //TODO: db컬럼에 토큰을 저장해야하나?
        Member member = memberRepository.save(Member.create(oAuthInfoResponse, "hello"));
        Token jwtToken = jwtService.createToken(member);
        member.createToken(jwtToken.getRefreshToken());
        log.debug("jwt token = {}", jwtToken);
        log.debug("새로운 맴버 생성 = {}", member);
        return MemberLoginResponse.of(member, jwtToken);
    }

    private boolean MemberExists(OAuthInfoResponse oAuthInfoResponse) {
        //TODO : 토큰을 받은 후 깃허브로 부터 받은 정보가 DB에 저장하거나 있는 정보인지 체크한다.
        return memberRepository.findByMemberEmail(oAuthInfoResponse.getEmail()).isPresent();
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
