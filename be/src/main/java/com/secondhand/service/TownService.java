package com.secondhand.service;

import com.secondhand.domain.town.TownRepository;
import com.secondhand.web.dto.response.MemberLoginResponse;
import com.secondhand.web.dto.response.MemberTownInfoResponse;
import com.secondhand.web.dto.response.TownResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TownService {

    private final TownRepository townRepository;

    public List<TownResponse> findByAll() {
        return townRepository.findAll()
                .stream().map(towns -> new TownResponse(towns))
                .collect(Collectors.toList());
    }

    public void delete(long townId) {
    }

    public MemberTownInfoResponse findByLoginId() {
        return new MemberTownInfoResponse();
    }

    public void save(long townId) {

    }
}
