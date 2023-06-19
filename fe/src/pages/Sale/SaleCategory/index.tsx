import React from 'react';
import { useLocation } from 'react-router-dom';

import { $Template } from '@styles/PageTemplate.style';
import SaleCategoryHeader from '@components/Sale/SaleCategory/SaleCategoryHeader';
import SaleCategoryMain from '@components/Sale/SaleCategory/SaleCategoryMain';

const SaleCategory = () => {
  const { state } = useLocation();
  const { currentCategoryId } = state;

  return (
    <$Template>
      <SaleCategoryHeader currentCategoryId={currentCategoryId} />
      <SaleCategoryMain currentCategoryId={currentCategoryId} />
    </$Template>
  );
};

export default SaleCategory;
