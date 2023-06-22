import React from 'react';
import { $ListItemContainer } from '@components/Home/HomeMain/HomeMainMain/HomeMainMain.style';

import ListItem from '@molecules/ListItem';
import ConvertPriceFormat from '@utils/convertPriceFormat';
import { $SalesHistoryMainContainer } from './SalesHistoryMain.style';

interface Product {
  productId: number;
  title: string;
  town: { townId: number; name: string };
  createdAt: string;
  status: string;
  price: number;
  countInfo: { chatCount: number; likeCount: number };
  imgUrl: string;
}

interface SalesHistoryMainProps {
  products: Product[];
  observerTarget: React.MutableRefObject<HTMLDivElement | null>;
}

const SalesHistoryMain = ({ products, observerTarget }: SalesHistoryMainProps) => {
  // [GET]  /sales?status=2&pageNum={pageNum}
  // FIXME(jayden): strict 모드 꺼도 순간 두번씩 호출됨 => observerTarget관련인듯하다.
  return (
    <$SalesHistoryMainContainer>
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
    </$SalesHistoryMainContainer>
  );
};

export default SalesHistoryMain;
