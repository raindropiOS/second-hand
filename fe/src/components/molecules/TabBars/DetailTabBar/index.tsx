import React from 'react';

import convertPriceFormat from '@utils/convertPriceFormat';

import { $DetailTabBar, $ChatButton, $LikeLayout } from './DetailTabBar.style';
import Icon from '@atoms/Icon';
import Button from '@atoms/Buttons/Button';

interface DetailTabBarProps {
  price: number;
}

const DetailTabBar = ({ price }: DetailTabBarProps) => {
  return (
    <$DetailTabBar>
      <$LikeLayout>
        <Icon name="like" width={24} height={24} />
        {convertPriceFormat(price)}
      </$LikeLayout>
      <Button onClick={() => console.log('chat button')} status="active" size="small">
        대화 중인 채팅방
      </Button>
    </$DetailTabBar>
  );
};

export default DetailTabBar;
