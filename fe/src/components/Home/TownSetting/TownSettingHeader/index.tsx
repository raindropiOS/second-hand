import React from 'react';
import { useNavigate } from 'react-router-dom';

import PATH from '@constants/routerPath';

import Button from '@atoms/Buttons/Button';
import Icon from '@atoms/Icon';
import Navbar from '@molecules/Navbar';
import { $RightEmptyBox } from '@components/Home/TownSetting/TownSettingHeader/TownSettingHeader.style';

const TownSettingHeader = () => {
  const navigate = useNavigate();

  return (
    <Navbar>
      <Button
        onClick={() => {
          navigate(PATH.HOME.DEFAULT);
        }}
        status="ghost"
      >
        <Icon name="chevronLeft" />
        <span>뒤로</span>
      </Button>
      <span>내 동네 설정</span>
      <$RightEmptyBox />
    </Navbar>
  );
};

export default TownSettingHeader;
