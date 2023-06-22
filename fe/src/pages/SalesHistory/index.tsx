import React, { useEffect, useState } from 'react';

import SalesHistoryHeader from '@components/SalesHistory/SalesHistoryHeader';
import SalesHistoryMain from '@components/SalesHistory/SalesHistoryMain';
import mockAxiosFetch from '@apis/instances/mockAxiosFetch';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { $Template } from '@styles/PageTemplate.style';
import { Outlet } from 'react-router-dom';

interface Product {
  productId: number;
  title: string;
  town: { townId: number; name: string };
  createdAt: string;
  status: string;
  price: number;
  countInfo: { chatCount: number; likeCount: number };
  imgUrl: string;
}

const SalesHistory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [status, setStatus] = useState(0);
  const [isPageUpdated, setIsPageUpdated] = useState(false);

  const intersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];

    if (!entry.isIntersecting || isPageUpdated) return;
    if (entry.isIntersecting) setPageNum(prevPageNum => prevPageNum + 1);
    setIsPageUpdated(true);
  };

  const observerTarget = useIntersectionObserver(intersectionObserverCallback);

  useEffect(() => {
    const getProducts = async () => {
      const response = await mockAxiosFetch('/products/sales', {
        method: 'GET',
        params: {
          pageNum,
          status,
        },
      });
      const data = await response.data;
      const isSuccess = data.success;
      const newProducts = data.data.products;

      // FIXME(jayden): error handling 수정하기
      if (!isSuccess) throw new Error('Failed to fetch products');
      setProducts(prevProducts => [...prevProducts, ...newProducts]);
    };

    // NOTE(jayden): strict mode로 인해 두번씩 호출됨
    getProducts();
  }, [pageNum, status]);

  const handleSalesStatusClick = (status: number) => {
    setProducts([]);
    setStatus(status);
    setIsPageUpdated(false);
    setPageNum(1);
  };

  return (
    <$Template>
      <SalesHistoryHeader onClick={handleSalesStatusClick} />
      {!!products.length && <SalesHistoryMain products={products} observerTarget={observerTarget} />}
      <Outlet />
    </$Template>
  );
};

export default SalesHistory;
