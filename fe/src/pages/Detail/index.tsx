import React from 'react';

import { $Template } from '@styles/PageTemplate.style';
import DetailHeader from '@components/Detail/DetailHeader';
import DetailTabBar from '@molecules/TabBars/DetailTabBar';

const Detail = () => {
  // TODO(jayden): productId 받아서 상품 상세 정보 가져오기
  return (
    <$Template>
      <DetailHeader />
      <DetailTabBar price={10000} />
    </$Template>
  );
};

export default Detail;
