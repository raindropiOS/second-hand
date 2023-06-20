import React from 'react';
import { useNavigate } from 'react-router-dom';

import PATH from '@constants/routerPath';

import Icon from '@atoms/Icon';
import Button from '@atoms/Buttons/Button';
import Navbar from '@components/molecules/Navbar';

import { $RightEmptyBox } from './HomeCategoryHeader.style';

const HomeCategoryHeader = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(PATH.HOME.DEFAULT);
  };

  return (
    <Navbar>
      <Button onClick={handleBackButtonClick} status="ghost">
        <Icon name="chevronLeft" />
        <span>닫기</span>
      </Button>
      <span>카테고리</span>
      <$RightEmptyBox />
    </Navbar>
  );
};

export default HomeCategoryHeader;
