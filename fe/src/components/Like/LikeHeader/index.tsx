import React from 'react';

import PATH from '@constants/routerPath';
import { CATEGORIES } from '@constants/categories';

import Navbar from '@components/molecules/Navbar';
import Chips from '@components/molecules/Chips';

import { $LikeHeaderLayout, $CurrentCategory } from './LikeHeader.style';

interface LikeHeaderProps {
  categoryIds: number[];
  handleChangeCategory(categoryId: number): void;
  currentCategory: number;
}

const LikeHeader = ({ categoryIds, handleChangeCategory, currentCategory }: LikeHeaderProps) => {
  const createCategoryList = (() => {
    const newCategoryIds = Array.from(new Set(categoryIds)).sort();

    return newCategoryIds.map(categoryId => {
      const category = CATEGORIES.find(category => category.id === categoryId) as { id: number; category: string };

      return { id: category.id, category: category.category };
    });
  })();

  return (
    <$LikeHeaderLayout>
      <Navbar>관심목록</Navbar>
      <$CurrentCategory>
        <Chips categories={createCategoryList} onClick={handleChangeCategory} currentCategory={currentCategory} />
      </$CurrentCategory>
    </$LikeHeaderLayout>
  );
};

export default LikeHeader;
