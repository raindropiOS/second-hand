import React from 'react';

import { ProductType } from '@type/productsType';

import ConvertPriceFormat from '@utils/convertPriceFormat';
import { useNavigate } from 'react-router-dom';

import ListItem from '@molecules/ListItem';
import PATH from '@constants/routerPath';
import { $LikeItemLayout, $ProductLists } from './LikeMain.style';

interface ListMainProps {
  products: ProductType[];
}

const ListMain = ({ products }: ListMainProps) => {
  const navigate = useNavigate();

  return (
    <$LikeItemLayout>
      <$ProductLists>
        {products.map(product => (
          <ListItem
            {...product}
            key={product.productId}
            price={ConvertPriceFormat(product.price)}
            isCurrentUserItem={false}
            onItemClick={() => navigate(`${PATH.PRODUCT.DETAIL(product.productId)}`)}
          />
        ))}
      </$ProductLists>
    </$LikeItemLayout>
  );
};

export default ListMain;
