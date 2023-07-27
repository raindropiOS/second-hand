import React from 'react';
import { useNavigate } from 'react-router-dom';

import { $ListItemContainer } from '@components/Home/HomeMain/HomeMainMain/HomeMainMain.style';
import { $SalesHistoryMainContainer } from './SalesHistoryMain.style';

import ListItem from '@molecules/ListItem';
import ConvertPriceFormat from '@utils/convertPriceFormat';
import PATH from '@constants/routerPath';

interface Product {
  productId: number;
  title: string;
  town: { townId: number; name: string };
  createdAt: string;
  status: number;
  price: number;
  countInfo: { chatCount: number; likeCount: number };
  imgUrl: string;
  isMine: boolean;
}

interface SalesHistoryMainProps {
  products: Product[];
  observerTarget: React.MutableRefObject<HTMLDivElement | null>;
}

const SalesHistoryMain = ({ products, observerTarget }: SalesHistoryMainProps) => {
  // FIXME(jayden): strict 모드 꺼도 순간 두번씩 호출됨 => observerTarget관련인듯하다.
  const navigate = useNavigate();

  return (
    <$SalesHistoryMainContainer>
      <$ListItemContainer>
        {products.map(product => (
          <ListItem
            {...product}
            key={product.productId}
            price={ConvertPriceFormat(product.price)}
            isCurrentUserItem={product.isMine}
            onItemClick={() => navigate(`${PATH.PRODUCT.DETAIL(product.productId)}`)}
          />
        ))}
        <div ref={observerTarget} />
      </$ListItemContainer>
    </$SalesHistoryMainContainer>
  );
};

export default SalesHistoryMain;
