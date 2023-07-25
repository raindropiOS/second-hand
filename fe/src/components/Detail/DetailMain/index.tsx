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
import useOutsideClick from '@hooks/useOutsideClick';
import StatusModal from '@components/molecules/StatusModal';

interface DetailMainProps {
  productDetail?: DetailProductType;
  handleRefreshData: (data: DetailProductType) => void;
}

const DetailMain = ({ productDetail, handleRefreshData }: DetailMainProps) => {
  const [isStatusModalOpen, setIsStatusModalOpen, modalRef] = useOutsideClick(false);

  const statusModalHandler = () => {
    if (!productDetail?.isMine) return;
    setIsStatusModalOpen(prev => !prev);
  };

  return (
    <>
      {productDetail ? (
        <$DetailMainContainer>
          <$SellerInfoWrapper>
            <div>판매자 정보</div>
            <div>{`${productDetail.seller.name}`}</div>
          </$SellerInfoWrapper>
          <$ProductInfoContainer>
            <$ProductStatusButton isStatusModalOpen={isStatusModalOpen} onClick={statusModalHandler}>
              <span>{`${GetStatusWord(productDetail?.status as number)}`}</span>
              {isStatusModalOpen ? <Icon name="chevronUp" width={12} /> : <Icon name="chevronDown" width={12} />}
              {isStatusModalOpen && productDetail.isMine && (
                <StatusModal currentStatus={productDetail.status} handleRefreshData={handleRefreshData} />
              )}
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
