import React, { ChangeEvent, useState } from 'react';

import { CATEGORIES } from '@constants/categories';

import TextInput from '@atoms/Inputs/TextInput';
import ImagePreviews from '@components/molecules/ImagePreviews';
import { $SaleMain, $CategoriesLayout, $RecommendCategories, $SelectCategoryButton } from './SaleMain.style';
import Chip from '@atoms/Chip';
import Icon from '@atoms/Icon';

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
  const [isRecommend, setIsRecommend] = useState(false);

  const onTitleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(prev => {
      return { ...prev, title: target.value };
    });
    setIsRecommend(true);
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

      {isRecommend && (
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
      <TextInput
        onChange={onContentChange}
        value={productInfo.content}
        placeholder="역삼1동에 올릴 게시물 내용을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)"
      />
    </$SaleMain>
  );
};

export default SaleMain;
