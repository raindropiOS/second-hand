import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import PATH from '@constants/routerPath';
import usePostNewProduct from '@apis/api/sale';
import SaleHeader from '@components/Sale/SaleHeader';
import SaleMain from '@components/Sale/SaleMain';

import { $Template } from '@styles/PageTemplate.style';

const Sale = () => {
  // TODO(hoonding): img도 추가해야함.
  // NOTE(hoonding): useReducer 도 고려.
  const [newProductInfo, setNewProductInfo] = useState<{ title: string; price: string; content: string }>({
    title: '',
    price: '',
    content: '',
  });

  const [imgFiles, setImgFiles] = useState<{ file: File; url: string }[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const currentCategory = location.state ? location.state.currentCategory : { id: 0, category: '', url: '' };

  const { mutate: addNewProduct, isLoading, isError, isSuccess } = usePostNewProduct();

  useEffect(() => {
    if (!sessionStorage.getItem('productInfo')) return;
    setNewProductInfo(JSON.parse(sessionStorage.getItem('productInfo') as string));
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
      categoryId: currentCategory.id,
      townId: 1,
    };

    imgFiles.forEach(({ file }) => {
      formData.append('productImages', file);
    });
    formData.append('contents', new Blob([JSON.stringify(contentsData)], { type: 'application/json' }));

    addNewProduct(formData, {
      onSuccess: ({ data }) => {
        navigate(PATH.PRODUCT.DETAIL(data.productId));
      },
    });
  };

  return (
    <$Template>
      <SaleHeader handleSubmit={handleSubmit} />
      <SaleMain
        imgFiles={imgFiles}
        productInfo={newProductInfo}
        currentCategory={currentCategory}
        onChange={setNewProductInfo}
        handleAddImg={handleAddImg}
        handleDeleteImg={handleDeleteImg}
      />
      <Outlet />
    </$Template>
  );
};

export default Sale;
