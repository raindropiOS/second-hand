import React, { useState } from 'react';

import Icon from '@atoms/Icon';
import type { IconComponents } from '@atoms/Icon/IconComponents';
import { $Tab, $MainTabBar } from './MainTabBar.style';

interface MenuType {
  id: number;
  name: keyof typeof IconComponents;
  text: string;
}

// TODO(hoonding): 다른 파일로 빼보기.
const MAIN_TAB_MENUS: MenuType[] = [
  {
    id: 1,
    name: 'home',
    text: '홈화면',
  },
  {
    id: 2,
    name: 'soldList',
    text: '판매내역',
  },
  {
    id: 3,
    name: 'like',
    text: '관심목록',
  },
  {
    id: 4,
    name: 'message',
    text: '채팅',
  },
  {
    id: 5,
    name: 'account',
    text: '내 계정',
  },
];

const MainTabBar = () => {
  const [isClicked, setIsClicked] = useState<boolean[]>([true, false, false, false, false]);

  const tabClickHandler = (id: number) => {
    // TODO(hoonding): 탭 클릭 시 router적용 + fetch 요청 보내기.
    setIsClicked(prev => prev.map((_, index) => index === id - 1));
  };

  return (
    <$MainTabBar>
      {MAIN_TAB_MENUS.map(({ id, name, text }) => {
        return (
          <$Tab key={id} onClick={() => tabClickHandler(id)} clicked={isClicked[id - 1]}>
            <Icon name={name} />
            {text}
          </$Tab>
        );
      })}
    </$MainTabBar>
  );
};

export default MainTabBar;
