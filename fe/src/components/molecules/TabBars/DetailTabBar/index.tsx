import React from 'react';

import { changeLikeStatus } from '@apis/api/productDetail';
import convertPriceFormat from '@utils/convertPriceFormat';

import { $DetailTabBar, $LikeLayout } from './DetailTabBar.style';
import Icon from '@atoms/Icon';
import Button from '@atoms/Buttons/Button';

interface DetailTabBarProps {
  price?: number;
  isLiked: boolean | undefined;
  productId: string;
  refetch: any;
}

const DetailTabBar = ({ price, isLiked, productId, refetch }: DetailTabBarProps) => {
  const handleLikeClick = async (isLiked: boolean, productId: string) => {
    changeLikeStatus(productId, isLiked);
    await refetch();
  };

  return (
    <$DetailTabBar>
      <$LikeLayout onClick={() => handleLikeClick(isLiked as boolean, productId)}>
        {isLiked ? (
          <Icon name="fillHeart" width={24} height={24} fill="#FF9500" />
        ) : (
          <Icon name="like" width={24} height={24} />
        )}
        {convertPriceFormat(price || 0)}
      </$LikeLayout>
      <Button onClick={() => console.log('chat button')} status="active" size="small">
        대화 중인 채팅방
      </Button>
    </$DetailTabBar>
  );
};

export default DetailTabBar;
