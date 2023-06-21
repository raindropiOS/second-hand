package com.secondhand.service;

import com.secondhand.domain.member.Member;
import com.secondhand.domain.town.Town;
import com.secondhand.domain.town.TownRepository;
import com.secondhand.web.dto.response.TownResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TownService {

    private final TownRepository townRepository;
    private final MemberService memberService;

    public List<TownResponse> findByAll() {
        return townRepository.findAll()
                .stream().map(towns -> new TownResponse(towns))
                .collect(Collectors.toList());
    }

    public void save(long townId) {

    }

    public TownResponse findTownDetail(long userId) {
        Member member = memberService.findMemberById(userId);
        Town mainTown = member.getMainTown();
        return new TownResponse(mainTown);
    }
}
