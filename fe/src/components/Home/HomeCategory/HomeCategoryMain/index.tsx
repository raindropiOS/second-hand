import React from 'react';
import { useNavigate } from 'react-router-dom';

import PATH from '@constants/routerPath';
import { CATEGORIES } from '@constants/categories';

import { $HomeCategoryMain, $Category, $CategoryImg, $CategoryTitle } from './HomeCategoryMain.style';

interface HomeCategoryMainProps {
  currentCategoryId: number;
}

const HomeCategoryMain = ({ currentCategoryId }: HomeCategoryMainProps) => {
  const navigate = useNavigate();

  const handleSelectCategory = (selectedId: number) => {
    navigate(PATH.HOME.DEFAULT, { state: { currentCategoryId: selectedId } });
  };

  return (
    <$HomeCategoryMain>
      {CATEGORIES.map(({ id, category, url }) => (
        <$Category key={id} onClick={() => handleSelectCategory(id)} selected={id === currentCategoryId}>
          <$CategoryImg src={url} />
          <$CategoryTitle>{category}</$CategoryTitle>
        </$Category>
      ))}
    </$HomeCategoryMain>
  );
};

export default HomeCategoryMain;
