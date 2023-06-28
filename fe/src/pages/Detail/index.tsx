import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { $Template } from '@styles/PageTemplate.style';
import DetailHeader from '@components/Detail/DetailHeader';
import DetailMain from '@components/Detail/DetailMain';
import DetailTabBar from '@molecules/TabBars/DetailTabBar';
import mockAxiosFetch from '@apis/instances/mockAxiosFetch';

import { DetailProductType } from '@type/productsType';

const Detail = () => {
  // TODO(jayden): productId 받아서 상품 상세 정보 가져오기
  const [productDetail, setProductDetail] = useState<DetailProductType>();
  const params = useParams();
  const { productId } = params;

  useEffect(() => {
    let ignore = false;
    const fetchProductDetail = async () => {
      try {
        const res = await mockAxiosFetch({
          url: `/products/${productId}`,
          method: 'GET',
        });

        if (ignore) {
          setProductDetail(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProductDetail();

    return () => {
      ignore = true;
    };
  }, []);
  return (
    <$Template isDetail={true}>
      <DetailHeader imgUrls={productDetail && productDetail.imgUrls} />
      <DetailMain productDetail={productDetail} />
      <DetailTabBar price={productDetail && productDetail.price} />
    </$Template>
  );
};

export default Detail;
