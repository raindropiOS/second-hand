import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { CATEGORIES } from '@constants/categories';
import PATH from '@constants/routerPath';
import usePostNewProduct from '@apis/api/sale';

import SaleHeader from '@components/Sale/SaleHeader';
import SaleMain from '@components/Sale/SaleMain';
import { $Template } from '@styles/PageTemplate.style';

const choiceCategories = (() => {
  const categories: { id: number; category: string; url: string }[] = [];

  while (categories.length < 3) {
    const random = Math.floor(Math.random() * CATEGORIES.length);

    if (!categories.map(({ id }) => id).includes(CATEGORIES[random].id)) categories.push(CATEGORIES[random]);
  }
  return categories;
})();

const Sale = () => {
  // TODO(hoonding): img도 추가해야함.
  // NOTE(hoonding): useReducer 도 고려.
  const [newProductInfo, setNewProductInfo] = useState<{ title: string; price: string; content: string }>({
    title: '',
    price: '',
    content: '',
  });
  const [imgFiles, setImgFiles] = useState<{ file: File; url: string }[]>([]);
  const [recommendCategories, setRecommendCategories] = useState(choiceCategories);

  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState(
    location.state ? location.state.currentCategory : { id: 0, category: '', url: '' }
  );

  const checkCanAllowSubmit = () => {
    if (newProductInfo.title.length === 0) return false;
    if (newProductInfo.content.length === 0) return false;
    if (category.id === 0) return false;
    if (imgFiles.length === 0) return false;
    return true;
  };

  const { mutate: addNewProduct, isLoading, isError, isSuccess } = usePostNewProduct();

  useEffect(() => {
    if (sessionStorage.getItem('productInfo'))
      setNewProductInfo(JSON.parse(sessionStorage.getItem('productInfo') as string));
    if (sessionStorage.getItem('imgFiles')) setImgFiles(JSON.parse(sessionStorage.getItem('imgFiles') as string));
    if (location.state) return;

    if (sessionStorage.getItem('selectedCategory'))
      setCategory(JSON.parse(sessionStorage.getItem('selectedCategory') as string));

    deleteTempNewProductData();
  }, []);

  useEffect(() => {
    const tempRecommendCategories = JSON.parse(sessionStorage.getItem('recommendCategories') as string) as {
      id: number;
      category: string;
      url: string;
    }[];

    if (!tempRecommendCategories) return;
    if (category.id === 0) return;
    if (tempRecommendCategories.map(({ id }) => id).includes(category.id)) {
      setRecommendCategories(tempRecommendCategories);
      return;
    }
    setRecommendCategories([category, ...tempRecommendCategories].slice(0, 3));
  }, []);

  const handleAddImg = (newImage: File, url: string) => {
    setImgFiles(prev => [...prev, { file: newImage, url: url }]);
  };

  const handleDeleteImg = (idx: number) => {
    setImgFiles(prev => prev.filter((_, index) => index !== idx));
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    // NOTE(hoonding): 여기서 ref를 설정해라!!!
    // NOTE(hoonding): ref는 DOM을 가르키는 용도가 아님. DOM가리킬때도 쓸뿐이지!
    // 값이 바뀌어도 렌더링이 안되는데, 이걸로 렌더링을 하고싶으면 state로 관리해야함.
    event.preventDefault();
    const formData = new FormData();
    const contentsData = {
      title: newProductInfo.title,
      price: newProductInfo.price,
      content: newProductInfo.content,
      categoryId: category.id,
      townId: 1,
    };

    imgFiles.forEach(({ file }) => {
      formData.append('productImages', file);
    });
    formData.append('title', newProductInfo.title);
    formData.append('price', newProductInfo.price.toString());
    formData.append('content', newProductInfo.content);
    formData.append('categoryId', category.id.toString());
    formData.append('townId', '1');

    addNewProduct(formData, {
      onSuccess: ({ data }) => {
        navigate(PATH.PRODUCT.DETAIL(data));
      },
    });
  };

  const handleCategory = (categoryId: number) => {
    setCategory(CATEGORIES.filter(category => category.id === categoryId)[0]);
  };

  const saveTempNewProductData = () => {
    // 뒤로 버튼 누르면 작성중이던 내용 저장.
    sessionStorage.setItem('selectedCategory', JSON.stringify(category));
    sessionStorage.setItem('productInfo', JSON.stringify(newProductInfo));
    sessionStorage.setItem('imgFiles', JSON.stringify(imgFiles));
    sessionStorage.setItem('recommendCategories', JSON.stringify(recommendCategories));
  };

  const deleteTempNewProductData = () => {
    sessionStorage.removeItem('selectedCategory');
    sessionStorage.removeItem('productInfo');
    sessionStorage.removeItem('imgFiles');
    sessionStorage.removeItem('recommendCategories');
  };

  return (
    <$Template>
      <SaleHeader
        handleSubmit={handleSubmit}
        canAllowSubmit={checkCanAllowSubmit()}
        saveTempNewProductData={saveTempNewProductData}
        deleteTempNewProductData={deleteTempNewProductData}
      />
      <SaleMain
        imgFiles={imgFiles}
        productInfo={newProductInfo}
        currentCategory={category}
        recommendCategories={recommendCategories}
        onChange={setNewProductInfo}
        handleCategory={handleCategory}
        handleAddImg={handleAddImg}
        handleDeleteImg={handleDeleteImg}
        saveTempNewProductData={saveTempNewProductData}
      />
      <Outlet />
    </$Template>
  );
};

export default Sale;
