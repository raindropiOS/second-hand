package com.secondhand.service;

import com.secondhand.domain.exception.JoinException;
import com.secondhand.domain.exception.MemberNotFoundException;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.member.MemberRepository;
import com.secondhand.oauth.RequestOAuthInfoService;
import com.secondhand.oauth.dto.OAuthInfoResponse;
import com.secondhand.oauth.dto.req.OAuthLoginParams;
import com.secondhand.oauth.service.JwtService;
import com.secondhand.web.dto.requset.JoinRequest;
import com.secondhand.web.dto.requset.SignupSocialRequest;
import com.secondhand.web.dto.requset.UpdateNickNameRequest;
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
        if (MemberExists(oAuthInfoResponse.getEmail())) {
            Member member = findMemberByEmail(oAuthInfoResponse.getEmail());
            Token jwtToken = jwtService.createToken(member);
            //TODO update 하면 토큰만 새로줘야 하는것 아닌가?
            member.updateTokens(jwtToken.getRefreshToken());
            log.debug("jwtToken = {}", jwtToken);
            log.debug("기존에 있던 회원 ==========================");
            return MemberLoginResponse.of(member, jwtToken);
        }

        //TODO: db컬럼에 토큰을 저장해야하나?
        Member member = memberRepository.save(Member.create(oAuthInfoResponse));
        Token jwtToken = jwtService.createToken(member);
        member.updateTokens(jwtToken.getRefreshToken());
        log.debug("jwt token = {}", jwtToken);
        log.debug("새로 생긴  회원 ==========================");
        return MemberLoginResponse.of(member, jwtToken);
    }

    private boolean MemberExists(String email) {
        //TODO : 토큰을 받은 후 깃허브로 부터 받은 정보가 DB에 저장하거나 있는 정보인지 체크한다.
        return memberRepository.findByMemberEmail(email).isPresent();
    }

    private Member findMemberByEmail(String email) {
        //TODO : 토큰을 받은 후 깃허브로 부터 받은 정보가 DB에 저장하거나 있는 정보인지 체크한다.
        return memberRepository.findByMemberEmail(email).orElseThrow(MemberNotFoundException::new);
    }


    @Transactional
    public MemberLoginResponse join(JoinRequest joinRequest) {
        if (MemberExists(joinRequest.getMemberEmail())) {
            throw new JoinException("이미 존재하는 회원입니다");
        }
        Member member = memberRepository.save(joinRequest.toEntity());
        Token jwtToken = jwtService.createToken(member);
        member.updateTokens(jwtToken.getRefreshToken());
        log.debug("jwt token = {}", jwtToken);
        log.debug("새로운 맴버 생성 = {}", member);
        return MemberLoginResponse.of(member, jwtToken);
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

    @Transactional
    public void signupEmail(long userId, SignupSocialRequest signupSocialRequest) {
        Member member = findMemberById(userId);
        if (member.getMemberEmail() == null) {
            member.updateEmail(signupSocialRequest.getEmail());
            return;
        }
        throw new JoinException("이미 이메일이 존재하는 회원입니다");
    }

    @Transactional
    public void updateNickName(long userId, UpdateNickNameRequest nickNameRequest) {
        Member member = findMemberById(userId);
        member.updateNickName(nickNameRequest.getNickName());
    }
}
