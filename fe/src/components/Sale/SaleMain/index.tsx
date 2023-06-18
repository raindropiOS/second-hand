import React, { ChangeEvent } from 'react';

import ImagePreviews from '@components/molecules/ImagePreviews';
import TextInput from '@atoms/Inputs/TextInput';
import { $SaleMain } from './SaleMain.style';

type ProductInfo = { title: string; price: string; content: string };

interface SaleHeaderProps {
  productInfo: ProductInfo;
  onChange: React.Dispatch<React.SetStateAction<ProductInfo>>;
}

const SaleMain = ({ onChange, productInfo }: SaleHeaderProps) => {
  const onTitleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(prev => {
      return { ...prev, title: target.value };
    });
  };

  const onPriceChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(prev => {
      return { ...prev, price: target.value };
    });
  };

  const onContentChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(prev => {
      return { ...prev, content: target.value };
    });
  };

  return (
    <$SaleMain>
      <ImagePreviews />
      <TextInput onChange={onTitleChange} value={productInfo.title} placeholder="글제목" />
      <TextInput onChange={onPriceChange} value={productInfo.price} placeholder="₩ 가격(선택사항)" />
      <TextInput
        onChange={onContentChange}
        value={productInfo.content}
        placeholder="역삼1동에 올릴 게시물 내용을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)"
      />
    </$SaleMain>
  );
};

export default SaleMain;
