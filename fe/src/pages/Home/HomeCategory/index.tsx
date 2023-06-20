import React from 'react';
import { useLocation } from 'react-router-dom';

import { $Template } from '@styles/PageTemplate.style';
import HomeCategoryHeader from '@components/Home/HomeCategory/HomeCategoryHeader';
import HomeCategoryMain from '@components/Home/HomeCategory/HomeCategoryMain';

const HomeCategory = () => {
  const { state } = useLocation();
  const { currentCategoryId } = state;

  return (
    <$Template>
      <HomeCategoryHeader />
      <HomeCategoryMain currentCategoryId={currentCategoryId} />
    </$Template>
  );
};

export default HomeCategory;
