package com.secondhand.service;

import com.secondhand.domain.member.Member;
import com.secondhand.domain.town.Town;
import com.secondhand.domain.town.TownRepository;
import com.secondhand.exception.TownNotFoundException;
import com.secondhand.web.dto.requset.TownRequest;
import com.secondhand.web.dto.response.TownResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TownService {

    private final TownRepository townRepository;
    private final MemberService memberService;

    public List<TownResponse> findByAll() {
        return townRepository.findAll()
                .stream().map(TownResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void save(long userId, long townId) {
        Member member = memberService.findMemberById(userId);
        Town town = findById(townId);
        member.changeTown(town);
    }

    //TODO 경우의 수를 생각해야함
    //1. main 타운만 들어오는 경우
    //2. 둘다 오는경우
    //3. sub 타운만들어오는경우
    @Transactional
    public void update(long userId, TownRequest townRequest) {
        Member member = memberService.findMemberById(userId);

        Town mainTown = townRepository.findById(townRequest.getTownsId()[0]).orElseThrow(TownNotFoundException::new);
        if (townRequest.getTownsId().length == 1) {
            member.updateTowns(mainTown, null);
            return;
        }

        Town subTown = townRepository.findById(townRequest.getTownsId()[1]).orElseThrow(TownNotFoundException::new);
        member.updateTowns(mainTown, subTown);
    }


    public List<TownResponse> findTownDetail(long userId) {
        Member member = memberService.findMemberById(userId);
        if (member.getMainTown() == null) {
            throw new TownNotFoundException();
        }
        TownResponse mainTown = new TownResponse(member.getMainTown());
        //TODO: subTown은 NULL이 올수있음
        if (member.getSubTown() == null) {
            return List.of(mainTown);
        }
        TownResponse subTown = new TownResponse(member.getSubTown());
        return List.of(mainTown, subTown);
    }

    public Town findById(Long townId) {
        return townRepository.findById(townId).orElseThrow(TownNotFoundException::new);
    }
}
