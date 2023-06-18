package com.secondhand.domain.town;

import com.secondhand.web.dto.response.MemberTownInfoResponse;
import com.secondhand.web.dto.response.TownDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TownService {

//    private final TownRepository townRepository;

    public List<TownDTO> findByAll() {
//        List<TownDTO> townList = townRepository.findAll()
//                .stream().map(towns -> TownDTO.of(towns))
//                .collect(Collectors.toList());
        return new ArrayList<>();
    }

    public void save(long townId) {
    }

    public void delete(long townId) {
    }

    public MemberTownInfoResponse findByLoginId() {
        return new MemberTownInfoResponse();
    }
}
