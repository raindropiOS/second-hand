import React from 'react';

import { ProductType } from '@type/productsType';

import ConvertPriceFormat from '@utils/convertPriceFormat';

import ListItem from '@molecules/ListItem';
import { $LikeItemLayout, $ProductLists } from './LikeMain.style';

interface ListMainProps {
  products: ProductType[];
}

const ListMain = ({ products }: ListMainProps) => {
  return (
    <$LikeItemLayout>
      <$ProductLists>
        {products.map(product => (
          <ListItem
            {...product}
            key={product.productId}
            price={ConvertPriceFormat(product.price)}
            isCurrentUserItem={false}
            onItemClick={() => console.log('onItemClick')}
          />
        ))}
      </$ProductLists>
    </$LikeItemLayout>
  );
};

export default ListMain;
