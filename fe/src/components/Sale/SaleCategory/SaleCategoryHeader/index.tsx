import React from 'react';

import Navbar from '@components/molecules/Navbar';
import Button from '@atoms/Buttons/Button';
import Icon from '@atoms/Icon';
import { $RightEmptyBox } from './SaleCategoryHeader.style';

const SaleCategoryHeader = () => {
  return (
    <Navbar>
      <Button onClick={() => console.log('second-test')} status="ghost">
        <Icon name="chevronLeft" />
        <span>닫기</span>
      </Button>
      <span>카테고리</span>
      <$RightEmptyBox />
    </Navbar>
  );
};

export default SaleCategoryHeader;
