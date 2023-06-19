import React, { useEffect, useRef, useState } from 'react';

import { $Template } from '@styles/PageTemplate.style';
import { $ListItemContainer, $SaleButtonContainer } from '@pages/Home/HomeMain/HomeMain.style';
import Navbar from '@components/molecules/Navbar';
import Dropdown from '@molecules/Dropdown';
import Icon from '@atoms/Icon';
import ListItem from '@molecules/ListItem';
import MainTabBar from '@molecules/TabBars/MainTabBar';
import ConvertPriceFormat from '@utils/convertPriceFormat';
import mockAxiosFetch from '@apis/instances/mockAxiosFetch';
import CircleButton from '@atoms/Buttons/CircleButton';

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

interface Town {
  townId: number;
  name: string;
}

const HomeMain = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [towns, setTowns] = useState<Town[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await mockAxiosFetch('/products', {
        method: 'GET',
      });
      const data = await response.data;
      const isSuccess = data.success;
      const products = data.data.products;

      // FIXME(jayden): error handling 수정하기
      if (!isSuccess) throw new Error('Failed to fetch products');
      setProducts(products);
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getTowns = async () => {
      const response = await mockAxiosFetch('/towns/member', {
        method: 'GET',
      });
      const data = await response.data;
      const isSuccess = data.success;
      const towns = data.data.town;

      if (!isSuccess) throw new Error('Failed to fetch towns');
      setTowns(towns);
    };

    getTowns();
  }, []);

  return (
    <>
      {!!products.length && !!towns.length && (
        <$Template>
          <Navbar>
            <Dropdown towns={towns} />
            <button>
              <Icon name="category" />
            </button>
          </Navbar>
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
          </$ListItemContainer>
          <$SaleButtonContainer>
            <CircleButton
              iconName="plus"
              size="large"
              onClick={() => {
                console.log('상품 판매하기');
              }}
            />
          </$SaleButtonContainer>
          <MainTabBar />
        </$Template>
      )}
    </>
  );
};

export default HomeMain;
