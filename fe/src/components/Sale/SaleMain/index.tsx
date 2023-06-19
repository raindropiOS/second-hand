import React, { useState, useRef, useCallback, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { CATEGORIES } from '@constants/categories';
import PATH from '@constants/routerPath';

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
  currentCategory: { id: number; category: string; url: string };
}

const choiceCategories = (() => {
  const categories: { id: number; category: string; url: string }[] = [];

  while (categories.length < 3) {
    const random = Math.floor(Math.random() * CATEGORIES.length);

    if (!categories.map(({ id }) => id).includes(CATEGORIES[random].id)) categories.push(CATEGORIES[random]);
  }
  return categories;
})();

const SaleMain = ({ onChange, productInfo, currentCategory }: SaleHeaderProps) => {
  const recommendCategory =
    currentCategory.id === 0 || choiceCategories.map(({ id }) => id).includes(currentCategory.id)
      ? choiceCategories
      : [currentCategory, ...choiceCategories];
  const [selectedCategory, setSelectedCategory] = useState<{ id: number; category: string; url: string }>(
    currentCategory
  );
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const navigate = useNavigate();

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

  const handleCategoryButtonClick = () => {
    // category state 전달!
    const currentCategoryId = selectedCategory.id;

    navigate(PATH.SALE.CATEGORY, { state: { currentCategoryId } });
  };

  const handleRecommendCategoryClick = (id: number) => {
    setSelectedCategory(CATEGORIES.filter(category => category.id === id)[0]);
  };

  return (
    <$SaleMain>
      <ImagePreviews />
      <TextInput onChange={onTitleChange} value={productInfo.title} placeholder="글제목" />

      {productInfo.title.length !== 0 && (
        <$CategoriesLayout>
          <$RecommendCategories>
            {recommendCategory.map(category => (
              <Chip
                key={category.id}
                content={category.category}
                active={category.id === selectedCategory.id}
                onClick={() => handleRecommendCategoryClick(category.id)}
              />
            ))}
          </$RecommendCategories>
          <$SelectCategoryButton onClick={handleCategoryButtonClick}>
            <Icon name="chevronRight" />
          </$SelectCategoryButton>
        </$CategoriesLayout>
      )}

      <TextInput onChange={onPriceChange} value={productInfo.price} placeholder="₩ 가격(선택사항)" />
      <$ContentTextArea
        ref={textRef}
        onChange={onContentChange}
        value={productInfo.content}
        placeholder={CATEGORIES.filter(({ id }) => id === selectedCategory.id)[0].placeholder}
        onInput={handleResizeHeight}
      />
    </$SaleMain>
  );
};

export default SaleMain;
