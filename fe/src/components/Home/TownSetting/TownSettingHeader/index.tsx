import React from 'react';
import { useNavigate } from 'react-router-dom';

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
          navigate('/home');
        }}
        status="ghost"
      >
        <Icon name="chevronLeft" />
        <span>닫기</span>
      </Button>
      <span>동네 설정</span>
      <$RightEmptyBox />
    </Navbar>
  );
};

export default TownSettingHeader;
