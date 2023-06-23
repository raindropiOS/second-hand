import React, { useState } from 'react';

import Icon from '@atoms/Icon';
import PATH from '@constants/routerPath';
import type { IconComponents } from '@atoms/Icon/IconComponents';
import { $Tab, $MainTabBar } from './MainTabBar.style';
import { Link, useNavigate } from 'react-router-dom';

interface MenuType {
  id: number;
  name: keyof typeof IconComponents;
  text: string;
  path: string;
}

// TODO(hoonding): 다른 파일로 빼보기.
const MAIN_TAB_MENUS: MenuType[] = [
  {
    id: 1,
    name: 'home',
    text: '홈화면',
    path: PATH.HOME.DEFAULT,
  },
  {
    id: 2,
    name: 'soldList',
    text: '판매내역',
    path: PATH.PRODUCT.SALES,
  },
  {
    id: 3,
    name: 'like',
    text: '관심목록',
    path: PATH.PRODUCT.LIKE,
  },
  {
    id: 4,
    name: 'message',
    text: '채팅',
    path: PATH.PRODUCT.CHAT,
  },
  {
    id: 5,
    name: 'account',
    text: '내 계정',
    path: PATH.AUTH.LOGIN,
  },
];

interface MainTabBarProps {
  isClickedId: number;
}

const MainTabBar = ({ isClickedId }: MainTabBarProps) => {
  const navigate = useNavigate();

  return (
    <$MainTabBar>
      {MAIN_TAB_MENUS.map(({ id, name, text, path }) => {
        return (
          <$Tab key={id} onClick={() => navigate(path)} clicked={id === isClickedId}>
            <Icon name={name} />
            {text}
          </$Tab>
        );
      })}
    </$MainTabBar>
  );
};

export default MainTabBar;
