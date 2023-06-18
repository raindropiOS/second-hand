import React, { useState, ChangeEvent } from 'react';

import Navbar from '@components/molecules/Navbar';
import { $SaleLayout } from './Sale.style';
import Button from '@atoms/Buttons/Button';
import SaleTabBar from '@components/molecules/TabBars/SaleTabBar';
import ImageInput from '@atoms/Inputs/ImageInput';
import TextInput from '@atoms/Inputs/TextInput';

const Sale = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');

  const onTitleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTitle(target.value);
  };

  const onPriceChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setPrice(target.value);
  };

  const onContentChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setContent(target.value);
  };

  return (
    <$SaleLayout>
      <Navbar>
        <Button onClick={() => console.log('second-test')} status="ghost">
          <span>뒤로</span>
        </Button>
        <span>내 물건 팔기</span>
        <Button onClick={() => console.log('second-test')} status="ghost">
          <span>완료</span>
        </Button>
      </Navbar>
      <ImageInput count={0} />
      <TextInput onChange={onTitleChange} value={title} placeholder="글제목" />
      <TextInput onChange={onPriceChange} value={price} placeholder="₩ 가격(선택사항)" />
      <TextInput
        onChange={onContentChange}
        value={content}
        placeholder="역삼1동에 올릴 게시물 내용을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)"
      />
      <SaleTabBar townNames="역삼 1동" />
    </$SaleLayout>
  );
};

export default Sale;
