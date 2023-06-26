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
  $SaleForm,
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
  imgFiles: { file: File; url: string }[];
  handleAddImg: (newImage: File, url: string) => void;
  handleDeleteImg: (idx: number) => void;
}

const choiceCategories = (() => {
  const categories: { id: number; category: string; url: string }[] = [];

  while (categories.length < 3) {
    const random = Math.floor(Math.random() * CATEGORIES.length);

    if (!categories.map(({ id }) => id).includes(CATEGORIES[random].id)) categories.push(CATEGORIES[random]);
  }
  return categories;
})();

const convertMoneyFormat = (price: string) => {
  if (price.length === 0) return '';
  let purePrice = price.replace(/[^0-9]/g, '');

  if (Number(purePrice) > 999999999) purePrice = '999999999';
  return `₩ ${purePrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

const SaleMain = ({
  imgFiles,
  onChange,
  productInfo,
  currentCategory,
  handleAddImg,
  handleDeleteImg,
}: SaleHeaderProps) => {
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
    // 문자를 입력받으면 그냥 전 데이터 그대로.
    // 숫자를 입력받으면 전 데이터에 추가.

    const currentValue = target.value.replace(/[^0-9]/g, '');

    onChange(prev => {
      return { ...prev, price: currentValue };
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

    sessionStorage.setItem('selectedCategory', JSON.stringify(selectedCategory));
    sessionStorage.setItem('productInfo', JSON.stringify(productInfo));
    navigate(PATH.SALE.CATEGORY, { state: { currentCategoryId } });
  };

  const handleRecommendCategoryClick = (id: number) => {
    setSelectedCategory(CATEGORIES.filter(category => category.id === id)[0]);
  };

  const getPlaceholder = (() => {
    if (selectedCategory.id === 0)
      return '역삼1동에 올릴 게시물 내용을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)';
    return CATEGORIES.filter(({ id }) => id === selectedCategory.id)[0].placeholder;
  })();

  // TODO(hoonding): onSubmit 넣어줘야함.
  return (
    <$SaleMain>
      <ImagePreviews imgFiles={imgFiles} handleAddImg={handleAddImg} handleDeleteImg={handleDeleteImg} />
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

      <TextInput
        onChange={onPriceChange}
        value={convertMoneyFormat(productInfo.price)}
        placeholder="₩ 가격(선택사항)"
      />
      <$ContentTextArea
        ref={textRef}
        onChange={onContentChange}
        value={productInfo.content}
        placeholder={getPlaceholder}
        onInput={handleResizeHeight}
      />
    </$SaleMain>
  );
};

export default SaleMain;
