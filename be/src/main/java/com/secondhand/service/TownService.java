package com.secondhand.service;

import com.secondhand.domain.exception.TownNotFoundException;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.town.Town;
import com.secondhand.domain.town.TownRepository;
import com.secondhand.web.dto.requset.TownRequest;
import com.secondhand.web.dto.response.TownResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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

    public void save(long userId, long townId) {
        Member member = memberService.findMemberById(userId);
        Town town = findById(townId);
        member.changeTown(town);
    }

    public void update(long userId, TownRequest townRequest) {
        Member member = memberService.findMemberById(userId);
        Town mainTown = townRepository.findById(townRequest.getMainTownId()).orElseThrow(TownNotFoundException::new);
        Town subTown = townRepository.findById(townRequest.getSubTownId()).orElseThrow(TownNotFoundException::new);
        member.updateTowns(mainTown, subTown);
    }

    public List<TownResponse> findTownDetail(long userId) {
        Member member = memberService.findMemberById(userId);
        TownResponse mainTown = new TownResponse(member.getMainTown());
        //TODO: subTown은 NULL이 올수있음
        TownResponse subTown = new TownResponse(member.getSubTown());
        return List.of(mainTown, subTown);
    }

    public Town findById(Long townId) {
        return townRepository.findById(townId).orElseThrow(TownNotFoundException::new);
    }


}
