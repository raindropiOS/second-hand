import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { $Template } from '@styles/PageTemplate.style';
import { $ListItemContainer, $SaleButtonContainer } from '@pages/Home/HomeMain/HomeMain.style';
import Navbar from '@components/molecules/Navbar';
import Dropdown from '@molecules/Dropdown';
import Icon from '@atoms/Icon';
import ListItem from '@molecules/ListItem';
import MainTabBar from '@molecules/TabBars/MainTabBar';
import ConvertPriceFormat from '@utils/convertPriceFormat';
import CircleButton from '@atoms/Buttons/CircleButton';
import mockAxiosFetch from '@apis/instances/mockAxiosFetch';

import PATH from '@constants/routerPath';

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

const useObserver = (callback: IntersectionObserverCallback, options: IntersectionObserverInit) => {
  const target = useRef<HTMLDivElement>(null);
  const observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    if (target.current) observer.observe(target.current);
  }, [target.current, observer]);

  return target;
};

const HomeMain = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [towns, setTowns] = useState<Town[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [isPageUpdated, setIsPageUpdated] = useState(false);
  const navigate = useNavigate();

  const callback = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];

    if (!entry.isIntersecting || isPageUpdated) return;
    if (entry.isIntersecting) setPageNum(prevPageNum => prevPageNum + 1);
    setIsPageUpdated(true);
  };

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };

  const target = useObserver(callback, options);

  useEffect(() => {
    const getProducts = async () => {
      const response = await mockAxiosFetch('/products', {
        method: 'GET',
        params: {
          pageNum, // 현재 페이지를 API로 전달
        },
      });
      const data = await response.data;
      const isSuccess = data.success;
      const newProducts = data.data.products;

      // FIXME(jayden): error handling 수정하기
      if (!isSuccess) throw new Error('Failed to fetch products');
      setProducts(prevProducts => [...prevProducts, ...newProducts]);
    };

    // NOTE(jayden): strict mode로 인해 두번씩 호출됨
    getProducts();
  }, [pageNum]);

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
            <div ref={target} />
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
          <MainTabBar />
        </$Template>
      )}
    </>
  );
};

export default HomeMain;
