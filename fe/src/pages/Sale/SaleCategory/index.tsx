import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { $Template } from '@styles/PageTemplate.style';
import SaleCategoryHeader from '@components/Sale/SaleCategory/SaleCategoryHeader';
import SaleCategoryMain from '@components/Sale/SaleCategory/SaleCategoryMain';

const SaleCategory = () => {
  const { state } = useLocation();
  const { currentCategory } = state;
  const navigate = useNavigate();

  return (
    <$Template>
      <SaleCategoryHeader />
      <SaleCategoryMain currentCategory={currentCategory} />
    </$Template>
  );
};

export default SaleCategory;
