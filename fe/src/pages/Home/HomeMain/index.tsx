import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import useIntersectionObserver from '@hooks/useIntersectionObserver';

import { $Template } from '@styles/PageTemplate.style';
import axiosFetch from '@apis/instances/axiosFetch';

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
  id: number;
  name: string;
}

const HomeMain = () => {
  const { state } = useLocation();

  const currentCategoryId = state ? state.currentCategoryId : 0;

  const [filterCategoryId, setFilterCategoryId] = useState(currentCategoryId);
  const [products, setProducts] = useState<Product[]>([]);
  const [towns, setTowns] = useState<Town[]>([]);
  const [page, setPage] = useState(0);
  const [selectedTownId, setSelectedTownId] = useState(0);
  const [isPageUpdated, setIsPageUpdated] = useState(false);
  const intersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];

    if (!entry.isIntersecting || isPageUpdated) return;
    if (entry.isIntersecting) setPage(prevPageNum => prevPageNum + 1);
    setIsPageUpdated(true);
  };

  const observerTarget = useIntersectionObserver(intersectionObserverCallback);

  useEffect(() => {
    const getTowns = async () => {
      const response = await axiosFetch('/towns/member', {
        method: 'GET',
      });
      const data = await response.data;
      const isSuccess = data.success;
      const towns = data.data;

      if (!isSuccess) throw new Error('Failed to fetch towns');
      setTowns(towns);
      setSelectedTownId(towns[0].id);
    };

    getTowns();
  }, []);

  // FIXME(jayden): 데이터 필터링 로직 수정하기
  useEffect(() => {
    const getProducts = async () => {
      const response =
        filterCategoryId !== 0
          ? await axiosFetch('/products', {
              method: 'GET',
              params: {
                page,
                categoryId: filterCategoryId,
                townId: selectedTownId,
              },
            })
          : await axiosFetch('/products', {
              method: 'GET',
              params: {
                page,
                townId: selectedTownId,
              },
            });

      const data = await response.data;
      const isSuccess = data.success;
      const newProducts = data.data.products;

      // FIXME(jayden): error handling 수정하기
      if (!isSuccess) throw new Error('Failed to fetch products');
      // 여기가 문제.

      setProducts(prevProducts => [...prevProducts, ...newProducts]);
    };

    // NOTE(jayden): strict mode로 인해 두번씩 호출됨
    getProducts();
  }, [page, selectedTownId, filterCategoryId]);

  useEffect(() => {
    setProducts([]);
    setPage(0);
    setIsPageUpdated(false);
  }, [selectedTownId, filterCategoryId]);

  const handleCancelFilter = () => {
    setFilterCategoryId(0);
  };

  const handleFilterTownId = (townId: number) => {
    setSelectedTownId(townId);
  };

  return (
    <$Template>
      {!!towns.length && (
        <>
          <HomeMainHeader towns={towns} currentCategoryId={filterCategoryId} handleFilterTownId={handleFilterTownId} />
          {products.length ? (
            <HomeMainMain
              products={products}
              observerTarget={observerTarget}
              currentCategoryId={filterCategoryId}
              handleCancelFilter={handleCancelFilter}
            />
          ) : (
            <main>상품이 없습니다.</main>
          )}
        </>
      )}
      <Outlet />
    </$Template>
  );
};

export default HomeMain;
