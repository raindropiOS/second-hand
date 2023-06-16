import React from 'react';

import convertPriceFormat from '@utils/convertPriceFormat';

import { $DetailTabBar, $ChatButton, $LikeLayout } from './DetailTabBar.style';
import Icon from '@atoms/Icon';

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
      <$ChatButton />
    </$DetailTabBar>
  );
};

export default DetailTabBar;
