import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useProductDetailData from '@apis/api/productDetail';

import { $Template } from '@styles/PageTemplate.style';
import DetailHeader from '@components/Detail/DetailHeader';
import DetailMain from '@components/Detail/DetailMain';
import DetailTabBar from '@molecules/TabBars/DetailTabBar';
import mockAxiosFetch from '@apis/instances/mockAxiosFetch';

import { DetailProductType } from '@type/productsType';

const Detail = () => {
  // TODO(jayden): productId 받아서 상품 상세 정보 가져오기
  const params = useParams();
  const { productId } = params;
  const [productDetail, setProductDetail] = useState<DetailProductType>();
  const { error, isLoading, refetch } = useProductDetailData(
    productId as string,
    setProductDetail as React.Dispatch<React.SetStateAction<DetailProductType>>
  );

  const handleRefreshData = (data: DetailProductType) => {
    setProductDetail(data);
  };

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
  else {
    return (
      <$Template isDetail={true}>
        <DetailHeader imgUrls={productDetail && productDetail.imgUrls} isMine={productDetail && productDetail.isMine} />
        <DetailMain productDetail={productDetail} />
        <DetailTabBar
          price={productDetail && productDetail.price}
          isLiked={productDetail && productDetail.isLiked}
          productId={productId as string}
          handleRefreshData={handleRefreshData}
        />
      </$Template>
    );
  }
};

export default Detail;
