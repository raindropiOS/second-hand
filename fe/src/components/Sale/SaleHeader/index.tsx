import React from 'react';

import Navbar from '@components/molecules/Navbar';
import Button from '@atoms/Buttons/Button';

const SaleHeader = () => {
  // TODO(hoonding): 완료 누르면 sessionStorage 비우기.
  return (
    <Navbar>
      <Button onClick={() => console.log('second-test')} status="ghost">
        <span>뒤로</span>
      </Button>
      <span>내 물건 팔기</span>
      <Button onClick={() => console.log('second-test')} status="ghost">
        <span>완료</span>
      </Button>
    </Navbar>
  );
};

export default SaleHeader;
