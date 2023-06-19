import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CATEGORIES } from '@constants/categories';
import PATH from '@constants/routerPath';

import { $SaleCategoryMain, $CategoryLists, $CategoryList } from './SaleCategoryMain.style';
import Icon from '@atoms/Icon';

interface SaleCategoryMainProps {
  currentCategoryId: number;
}

const SaleCategoryMain = ({ currentCategoryId }: SaleCategoryMainProps) => {
  const navigate = useNavigate();

  const handleSelectCategory = (selectedId: number) => {
    navigate(PATH.SALE.DEFAULT, { state: { currentCategory: CATEGORIES.filter(({ id }) => id === selectedId)[0] } });
  };

  return (
    <$SaleCategoryMain>
      <$CategoryLists>
        {CATEGORIES.map(({ id, category }) => (
          <$CategoryList key={id} active={currentCategoryId === id} onClick={() => handleSelectCategory(id)}>
            {category}
            {currentCategoryId === id && <Icon name="checkmark" />}
          </$CategoryList>
        ))}
      </$CategoryLists>
    </$SaleCategoryMain>
  );
};

export default SaleCategoryMain;
