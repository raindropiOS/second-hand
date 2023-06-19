import React from 'react';
import { useNavigate } from 'react-router-dom';

import PATH from '@constants/routerPath';
import { CATEGORIES } from '@constants/categories';

import Navbar from '@components/molecules/Navbar';
import Button from '@atoms/Buttons/Button';
import Icon from '@atoms/Icon';
import { $RightEmptyBox } from './SaleCategoryHeader.style';

interface SaleCategoryHeaderProps {
  currentCategoryId: number;
}

const SaleCategoryHeader = ({ currentCategoryId }: SaleCategoryHeaderProps) => {
  const navigate = useNavigate();

  const handleCloseButtonClick = () => {
    navigate(PATH.SALE.DEFAULT, {
      state: {
        currentCategory:
          currentCategoryId === 0
            ? { id: 0, category: '', url: '' }
            : CATEGORIES.filter(({ id }) => id === currentCategoryId)[0],
      },
    });
  };

  return (
    <Navbar>
      <Button onClick={handleCloseButtonClick} status="ghost">
        <Icon name="chevronLeft" />
        <span>닫기</span>
      </Button>
      <span>카테고리</span>
      <$RightEmptyBox />
    </Navbar>
  );
};

export default SaleCategoryHeader;
