import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const currentCategory = location.state ? location.state.currentCategory : { id: 0, category: '', url: '' };

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

    // for (let i = 0; i < imgFiles.length; i++) {
    //   formData.append('file', imgFiles[i].file);
    // }
    imgFiles.forEach(({ file }) => {
      console.log(11);
      formData.append('productImages', file);
    });
    formData.append('contents', new Blob([JSON.stringify(contentsData)], { type: 'application/json' }));

    console.log(formData.get('productImages'), formData.get('contents'));
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
