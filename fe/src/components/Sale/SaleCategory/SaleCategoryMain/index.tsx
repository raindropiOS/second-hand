import React from 'react';

import { CATEGORIES } from '@constants/categories';

import { $SaleCategoryMain, $CategoryLists, $CategoryList } from './SaleCategoryMain.style';
import Icon from '@atoms/Icon';

interface SaleCategoryMainProps {
  currentCategory: { id: number; category: string; url: string }[];
}

const SaleCategoryMain = ({ currentCategory }: SaleCategoryMainProps) => {
  return (
    <$SaleCategoryMain>
      <$CategoryLists>
        {CATEGORIES.map(({ id, category }) => (
          <$CategoryList key={id} active={currentCategory[0]?.id === id}>
            {category}
            {currentCategory[0]?.id === id && <Icon name="checkmark" />}
          </$CategoryList>
        ))}
      </$CategoryLists>
    </$SaleCategoryMain>
  );
};

export default SaleCategoryMain;
