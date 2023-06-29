import React, { useEffect, useState } from 'react';

import useSaleHistoryProductsData from '@apis/api/saleHistory';

import SalesHistoryHeader from '@components/SalesHistory/SalesHistoryHeader';
import SalesHistoryMain from '@components/SalesHistory/SalesHistoryMain';
import mockAxiosFetch from '@apis/instances/mockAxiosFetch';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { $Template } from '@styles/PageTemplate.style';
import { Outlet } from 'react-router-dom';
import Skeleton from '@pages/Loading/Skeleton';

interface Product {
  productId: number;
  title: string;
  town: { townId: number; name: string };
  createdAt: string;
  status: number;
  price: number;
  countInfo: { chatCount: number; likeCount: number };
  imgUrl: string;
}

const SalesHistory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [status, setStatus] = useState(0);
  const [isPageUpdated, setIsPageUpdated] = useState(false);
  const { data, isError, error } = useSaleHistoryProductsData(pageNum, status);

  const intersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];

    if (!entry.isIntersecting || isPageUpdated) return;
    if (entry.isIntersecting) setPageNum(prevPageNum => prevPageNum + 1);
    setIsPageUpdated(true);
  };

  const observerTarget = useIntersectionObserver(intersectionObserverCallback);

  useEffect(() => {
    if (!data) return;
    const newProducts = data.products;

    setProducts(prevProducts => [...prevProducts, ...newProducts]);
  }, [data]);

  if (isError) return <div>에러가 발생했습니다.</div>;

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
