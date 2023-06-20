import React from 'react';
import { useNavigate } from 'react-router-dom';

import PATH from '@constants/routerPath';
import CircleButton from '@atoms/Buttons/CircleButton';
import ListItem from '@molecules/ListItem';
import ConvertPriceFormat from '@utils/convertPriceFormat';
import { $ListItemContainer, $SaleButtonContainer } from './HomeMainMain.style';

interface HomeMainMainProps {
  products: {
    productId: number;
    title: string;
    town: { townId: number; name: string };
    createdAt: string;
    status: string;
    price: number;
    countInfo: { chatCount: number; likeCount: number };
    imgUrl: string;
  }[];
  observerTarget: React.MutableRefObject<HTMLDivElement | null>;
}

// FIXME(jayden) 컴포넌트 이름 main 중첩 생각해보기
const HomeMainMain = ({ products, observerTarget }: HomeMainMainProps) => {
  const navigate = useNavigate();

  return (
    <>
      <$ListItemContainer>
        {products.map(product => (
          <ListItem
            {...product}
            key={product.productId}
            price={ConvertPriceFormat(product.price)}
            isCurrentUserItem={true}
            onItemClick={() => console.log('onItemClick')}
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
