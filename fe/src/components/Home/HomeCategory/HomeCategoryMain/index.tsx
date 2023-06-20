import React from 'react';

import { CATEGORIES } from '@constants/categories';

import { $HomeCategoryMain, $Category, $CategoryImg, $CategoryTitle } from './HomeCategoryMain.style';

const HomeCategoryMain = () => {
  return (
    <$HomeCategoryMain>
      {CATEGORIES.map(({ id, category, url }) => (
        <$Category key={id}>
          <$CategoryImg src={url} />
          <$CategoryTitle>{category}</$CategoryTitle>
        </$Category>
      ))}
    </$HomeCategoryMain>
  );
};

export default HomeCategoryMain;
