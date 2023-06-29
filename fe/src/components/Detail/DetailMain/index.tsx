import Icon from '@atoms/Icon';
import React from 'react';

import {
  $DetailMainContainer,
  $SellerInfoWrapper,
  $ProductInfoContainer,
  $ProductStatusButton,
  $ProductTitle,
  $ProductPriceTimestamp,
  $ProductDescription,
  $ProductSubInfoWrapper,
} from './DetailMain.style';

import { DetailProductType } from '@type/productsType';
import GetStatusWord from '@utils/getStatusWord';

interface DetailMainProps {
  productDetail?: DetailProductType;
}

const DetailMain = ({ productDetail }: DetailMainProps) => {
  return (
    <>
      {productDetail ? (
        <$DetailMainContainer>
          <$SellerInfoWrapper>
            <div>판매자 정보</div>
            <div>{`${productDetail?.seller.name}`}</div>
          </$SellerInfoWrapper>
          <$ProductInfoContainer>
            <$ProductStatusButton>
              <span>{`${GetStatusWord(productDetail?.status as number)}`}</span>
              <Icon name="chevronDown" width={12} />
            </$ProductStatusButton>
            <$ProductTitle>{`${productDetail?.title}`}</$ProductTitle>
            <$ProductPriceTimestamp>
              {`${productDetail?.category.name}`}•{`${productDetail?.createdAt}`}
            </$ProductPriceTimestamp>
            <$ProductDescription>{`${productDetail?.content}`}</$ProductDescription>
            <$ProductSubInfoWrapper>
              <span>채팅 {`${productDetail?.countInfo.chatCount}`}</span>
              <span>관심 {`${productDetail?.countInfo.likeCount}`}</span>
              <span>조회 {`${productDetail?.countInfo.viewCount}`}</span>
            </$ProductSubInfoWrapper>
          </$ProductInfoContainer>
        </$DetailMainContainer>
      ) : (
        <div>로딩 중</div>
      )}
    </>
  );
};

export default DetailMain;
