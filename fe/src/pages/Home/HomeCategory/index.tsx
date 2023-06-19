import React from 'react';

import { $Template } from '@styles/PageTemplate.style';
import HomeCategoryHeader from '@components/Home/HomeCategory/HomeCategoryHeader';
import HomeCategoryMain from '@components/Home/HomeCategory/HomeCategoryMain';

const HomeCategory = () => {
  return (
    <$Template>
      <HomeCategoryHeader />
      <HomeCategoryMain />
    </$Template>
  );
};

export default HomeCategory;
