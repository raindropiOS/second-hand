import React, { ChangeEvent, useRef, useCallback } from 'react';

import { CATEGORIES } from '@constants/categories';

import TextInput from '@atoms/Inputs/TextInput';
import Icon from '@atoms/Icon';
import Chip from '@atoms/Chip';
import ImagePreviews from '@components/molecules/ImagePreviews';
import {
  $SaleMain,
  $CategoriesLayout,
  $RecommendCategories,
  $SelectCategoryButton,
  $ContentTextArea,
} from './SaleMain.style';

type ProductInfo = { title: string; price: string; content: string };

interface SaleHeaderProps {
  productInfo: ProductInfo;
  onChange: React.Dispatch<React.SetStateAction<ProductInfo>>;
}

const choiceCategories = (() => {
  const categories: { id: number; category: string; url: string }[] = [];

  while (categories.length < 3) {
    const random = Math.floor(Math.random() * CATEGORIES.length);

    if (!categories.map(({ id }) => id).includes(CATEGORIES[random].id)) categories.push(CATEGORIES[random]);
  }
  return categories;
})();

const SaleMain = ({ onChange, productInfo }: SaleHeaderProps) => {
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeHeight = useCallback(() => {
    if (!textRef.current) return;
    const { style } = textRef.current;

    if (parseInt(style.maxHeight) < parseInt(style.height)) return;
    style.height = textRef.current.scrollHeight + 'px';
  }, []);

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

  const onContentChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(prev => {
      return { ...prev, content: target.value };
    });
  };

  return (
    <$SaleMain>
      <ImagePreviews />
      <TextInput onChange={onTitleChange} value={productInfo.title} placeholder="글제목" />

      {productInfo.title.length !== 0 && (
        <$CategoriesLayout>
          <$RecommendCategories>
            {choiceCategories.map(category => (
              <Chip key={category.id} content={category.category} active={false} />
            ))}
          </$RecommendCategories>
          <$SelectCategoryButton>
            <Icon name="chevronRight" />
          </$SelectCategoryButton>
        </$CategoriesLayout>
      )}

      <TextInput onChange={onPriceChange} value={productInfo.price} placeholder="₩ 가격(선택사항)" />
      <$ContentTextArea
        ref={textRef}
        onChange={onContentChange}
        value={productInfo.content}
        placeholder="역삼1동에 올릴 게시물 내용을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)"
        onInput={handleResizeHeight}
      />
    </$SaleMain>
  );
};

export default SaleMain;
