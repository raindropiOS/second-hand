import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import useIntersectionObserver from '@hooks/useIntersectionObserver';

import { $Template } from '@styles/PageTemplate.style';
import mockAxiosFetch from '@apis/instances/mockAxiosFetch';

import HomeMainHeader from '@components/Home/HomeMain/HomeMainHeader';
import HomeMainMain from '@components/Home/HomeMain/HomeMainMain';

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

interface Town {
  townId: number;
  name: string;
}

const HomeMain = () => {
  const { state } = useLocation();

  const currentCategoryId = state ? state.currentCategoryId : 0;

  const [filterCategoryId, setFilterCategoryId] = useState(currentCategoryId);
  const [products, setProducts] = useState<Product[]>([]);
  const [towns, setTowns] = useState<Town[]>([]);
  const [pageNum, setPageNum] = useState(1);
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
      const response = await mockAxiosFetch('/products', {
        method: 'GET',
        params: {
          pageNum, // 현재 페이지를 API로 전달
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
  }, [pageNum]);

  useEffect(() => {
    const getTowns = async () => {
      const response = await mockAxiosFetch('/towns/member', {
        method: 'GET',
      });
      const data = await response.data;
      const isSuccess = data.success;
      const towns = data.data.town;

      if (!isSuccess) throw new Error('Failed to fetch towns');
      setTowns(towns);
    };

    getTowns();
  }, []);

  const handleCancelFilter = () => {
    setFilterCategoryId(0);
  };

  return (
    <$Template>
      {!!products.length && !!towns.length && (
        <>
          <HomeMainHeader towns={towns} currentCategoryId={filterCategoryId} />
          <HomeMainMain
            products={products}
            observerTarget={observerTarget}
            currentCategoryId={filterCategoryId}
            handleCancelFilter={handleCancelFilter}
          />
        </>
      )}
      <Outlet />
    </$Template>
  );
};

export default HomeMain;
