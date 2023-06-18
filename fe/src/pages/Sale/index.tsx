import React, { useState } from 'react';

import SaleTabBar from '@components/molecules/TabBars/SaleTabBar';
import SaleHeader from '@components/Sale/SaleHeader';
import SaleMain from '@components/Sale/SaleMain';

import { $Template } from '@styles/PageTemplate.style';

const Sale = () => {
  // TODO(hoonding): img도 추가해야함.
  // NOTE(hoonding): useReducer 도 고려.
  const [newProductInfo, setNewProductInfo] = useState<{ title: string; price: string; content: string }>({
    title: '',
    price: '',
    content: '',
  });

  return (
    <$Template>
      <SaleHeader />
      <SaleMain productInfo={newProductInfo} onChange={setNewProductInfo} />
      <SaleTabBar townNames="역삼 1동" />
    </$Template>
  );
};

export default Sale;
