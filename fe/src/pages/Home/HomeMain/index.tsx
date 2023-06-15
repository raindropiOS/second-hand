import React from 'react';

import { $Template } from '@styles/PageTemplate.style';
import { $ListItemContainer } from '@pages/Home/HomeMain/HomeMain.style';
import Navbar from '@components/molecules/Navbar';
import Dropdown from '@molecules/Dropdown';
import Icon from '@atoms/Icon';
import ListItem from '@molecules/ListItem';
import MainTabBar from '@molecules/TabBars/MainTabBar';
import ConvertPriceFormat from '@utils/convertPriceFormat';

import { mockData, mockUserTowns } from './mockData';

const HomeMain = () => {
  return (
    <$Template>
      <Navbar>
        <Dropdown towns={mockUserTowns} />
        <button>
          <Icon name="category" />
        </button>
      </Navbar>
      <$ListItemContainer>
        {mockData.data.products.map(product => (
          <ListItem
            key={product.productId}
            productId={product.productId}
            title={product.title}
            town={product.town}
            price={ConvertPriceFormat(product.price)}
            status={product.status}
            createdAt={product.createdAt}
            countInfo={product.countInfo}
            imgUrl={product.imgUrl}
            isCurrentUserItem={true}
            onItemClick={() => console.log('onItemClick')}
          />
        ))}
      </$ListItemContainer>
      <MainTabBar />
    </$Template>
  );
};

export default HomeMain;
