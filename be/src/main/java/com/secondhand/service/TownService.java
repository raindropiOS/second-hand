package com.secondhand.service;

import com.secondhand.exception.CategoryNotFoundException;
import com.secondhand.exception.TownNotFoundException;
import com.secondhand.domain.member.Member;
import com.secondhand.domain.town.Town;
import com.secondhand.domain.town.TownRepository;
import com.secondhand.web.dto.requset.TownRequest;
import com.secondhand.web.dto.response.TownResponse;
import com.secondhand.web.dto.updatedto.TownDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
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
    @Transactional
    public void update(long userId, TownRequest townRequest) {
        Member member = memberService.findMemberById(userId);

        Town mainTown = townRepository.findById(townRequest.getMainTownId()).orElseThrow(TownNotFoundException::new);
        member.updateMainTowns(mainTown);

        if (townRequest.getSubTownId() == null) {
            member.updateTowns(mainTown, null);
            return;
        }

        Town subTown = townRepository.findById(townRequest.getSubTownId()).orElseThrow(TownNotFoundException::new);
        member.updateTowns(mainTown, subTown);
    }


    public List<TownResponse> findTownDetail(long userId) {
        Member member = memberService.findMemberById(userId);
        TownResponse mainTown = new TownResponse(member.getMainTown());
        if (member.getMainTown() == null) {
            throw new TownNotFoundException();
        }
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

    public TownDTO findDtoById(Long townId) {
        Town town = townRepository.findById(townId).orElseThrow(CategoryNotFoundException::new);
        return TownDTO.from(town);
    }
}
