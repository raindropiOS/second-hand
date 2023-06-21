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

const MainTabBar = () => {
  const [isClicked, setIsClicked] = useState<boolean[]>([true, false, false, false, false]);
  const navigate = useNavigate();
  const tabClickHandler = (id: number, path: string) => {
    // TODO(hoonding): 탭 클릭 시 router적용 + fetch 요청 보내기.
    setIsClicked(prev => prev.map((_, index) => index === id - 1));
    navigate(path);
  };

  return (
    <$MainTabBar>
      {MAIN_TAB_MENUS.map(({ id, name, text, path }) => {
        return (
          <$Tab key={id} onClick={() => tabClickHandler(id, path)} clicked={isClicked[id - 1]}>
            <Icon name={name} />
            {text}
          </$Tab>
        );
      })}
    </$MainTabBar>
  );
};

export default MainTabBar;
