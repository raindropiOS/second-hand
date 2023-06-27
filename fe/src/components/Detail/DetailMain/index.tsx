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

const DetailMain = () => {
  return (
    <$DetailMainContainer>
      <$SellerInfoWrapper>
        <div>판매자 정보</div>
        <div>판매자 닉네임</div>
      </$SellerInfoWrapper>
      <$ProductInfoContainer>
        <$ProductStatusButton>
          <span>판매중</span>
          <Icon name="chevronDown" width={12} />
        </$ProductStatusButton>
        <$ProductTitle>상품 제목</$ProductTitle>
        <$ProductPriceTimestamp>가구/인테리어•1분 전</$ProductPriceTimestamp>
        <$ProductDescription>상품 설명</$ProductDescription>
        <$ProductSubInfoWrapper>
          <span>채팅 0</span>
          <span>관심 0</span>
          <span>조회 1</span>
        </$ProductSubInfoWrapper>
      </$ProductInfoContainer>
    </$DetailMainContainer>
  );
};

export default DetailMain;
