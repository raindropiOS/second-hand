import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CATEGORIES } from '@constants/categories';
import ConvertPriceFormat from '@utils/convertPriceFormat';

import PATH from '@constants/routerPath';
import CircleButton from '@atoms/Buttons/CircleButton';
import Chip from '@atoms/Chip';
import ListItem from '@molecules/ListItem';
import { $ListItemContainer, $SaleButtonContainer, $CurrentCategory, $CancelButton } from './HomeMainMain.style';
import Icon from '@atoms/Icon';

interface HomeMainMainProps {
  products: {
    productId: number;
    title: string;
    town: { townId: number; name: string };
    createdAt: string;
    status: number;
    price: number;
    countInfo: { chatCount: number; likeCount: number };
    imgUrl: string;
  }[];
  observerTarget: React.MutableRefObject<HTMLDivElement | null>;
  currentCategoryId: number;
  handleCancelFilter: () => void;
}

// FIXME(jayden) 컴포넌트 이름 main 중첩 생각해보기
const HomeMainMain = ({ products, observerTarget, currentCategoryId, handleCancelFilter }: HomeMainMainProps) => {
  const navigate = useNavigate();

  const findCategoryName = (categoryId: number) => {
    return CATEGORIES.filter(({ id }) => id === categoryId)[0].category;
  };

  return (
    <>
      <$ListItemContainer>
        {currentCategoryId !== 0 && (
          <$CurrentCategory>
            <Chip content={findCategoryName(currentCategoryId)} active={true} onClick={handleCancelFilter}>
              <$CancelButton>
                <Icon name="cancel" fill="white" width={10} height={10} />
              </$CancelButton>
            </Chip>
          </$CurrentCategory>
        )}
        {products.map(product => (
          <ListItem
            {...product}
            key={product.productId}
            price={ConvertPriceFormat(product.price)}
            isCurrentUserItem={true}
            onItemClick={() => navigate(`${PATH.PRODUCT.DETAIL(product.productId)}`)}
          />
        ))}
        <div ref={observerTarget} />
      </$ListItemContainer>
      <$SaleButtonContainer>
        <CircleButton
          iconName="plus"
          size="large"
          onClick={() => {
            navigate(PATH.SALE.DEFAULT);
          }}
        />
      </$SaleButtonContainer>
    </>
  );
};

export default HomeMainMain;
