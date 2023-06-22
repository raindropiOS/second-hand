import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import useLikeProductsData from '@apis/api/like';

import LikeHeader from '@components/Like/LikeHeader';
import ListMain from '@components/Like/LikeMain';
import { $Template } from '@styles/PageTemplate.style';

const Like = () => {
  const [fetchOptions, setFetchOptions] = useState({
    pageNum: 1,
    categoryId: 0,
  });
  const { data, isLoading, isError, error } = useLikeProductsData(fetchOptions.pageNum, fetchOptions.categoryId);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const handleChangeCategory = (categoryId: number) => {
    setFetchOptions(prev => {
      return { ...prev, categoryId };
    });
  };

  return (
    <$Template>
      <LikeHeader
        categoryIds={data.categoryIds}
        handleChangeCategory={handleChangeCategory}
        currentCategory={fetchOptions.categoryId}
      />
      {data && <ListMain products={data.products} />}
      <Outlet />
    </$Template>
  );
};

export default Like;
