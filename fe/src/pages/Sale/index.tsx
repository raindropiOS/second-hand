import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const currentCategory = location.state ? location.state.currentCategory : { id: 0, category: '', url: '' };

  useEffect(() => {
    if (!sessionStorage.getItem('productInfo')) return;
    setNewProductInfo(JSON.parse(sessionStorage.getItem('productInfo') as string));
  }, []);

  return (
    <$Template>
      <SaleHeader />
      <SaleMain productInfo={newProductInfo} currentCategory={currentCategory} onChange={setNewProductInfo} />
      <Outlet />
    </$Template>
  );
};

export default Sale;
