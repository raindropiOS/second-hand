package com.secondhand.service;

import com.secondhand.domain.member.Member;
import com.secondhand.domain.member.MemberProfileRepository;
import com.secondhand.domain.member.MemberRepository;
import com.secondhand.domain.member.MemberTokenRepository;
import com.secondhand.exception.MemberNotFoundException;
import com.secondhand.web.dto.requset.UpdateNickNameRequest;
import com.secondhand.web.dto.response.MemberResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberProfileRepository memberProfileRepository;
    private final MemberTokenRepository memberTokenRepository;


    public MemberResponse getUserInfo(long userId) {
        return MemberResponse.from(findMemberById(userId));
    }

    public Member findMemberById(long userId) {
        return memberRepository.findById(userId).orElseThrow(MemberNotFoundException::new);
    }

    @Transactional
    public void updateNickName(long userId, UpdateNickNameRequest nickNameRequest) {
        Member member = findMemberById(userId);
        member.updateNickName(nickNameRequest.getNickName());
    }
}
