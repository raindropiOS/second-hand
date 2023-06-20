import React from 'react';
import { useNavigate } from 'react-router-dom';

import PATH from '@constants/routerPath';

import Icon from '@atoms/Icon';
import Button from '@atoms/Buttons/Button';
import Navbar from '@molecules/Navbar';
import { $CenterEmptyBox, $RightEmptyBox } from './TownSearchingHeader.style';

// FIXME(jayden): towns 타입(TOWN) import해서 사용하기
interface TownSearchingHeaderProps {
  selectedTowns: { townId: number; name: string }[];
}

const TownSearchingHeader = ({ selectedTowns }: TownSearchingHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Navbar>
      <Button
        onClick={() => {
          if (selectedTowns.length === 0) {
            alert('최소 1개의 동네를 설정해주세요!');
            return;
          }
          navigate(PATH.HOME.TOWN_SETTING, { state: { towns: selectedTowns } });
        }}
        status="ghost"
      >
        <Icon name="chevronLeft" />
        <span>뒤로</span>
      </Button>
      <$CenterEmptyBox />
      <$RightEmptyBox />
    </Navbar>
  );
};

export default TownSearchingHeader;
