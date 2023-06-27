import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { PRODUCTS } from '@constants/API';
import { SaleHistoryProductsType, APIDefaultResponseType } from '@type/productsType';

import axiosFetch from '@apis/instances/axiosFetch';

const getProductDetail = async () => {
  const response = await axiosFetch.get('/products/2');

  return response.data;
};

const useProductDetailData = () => {
  return useQuery<APIDefaultResponseType<SaleHistoryProductsType>, AxiosError, SaleHistoryProductsType>(
    ['productDetail', 2],
    () => getProductDetail(),
    { select: data => data.data, cacheTime: 0, staleTime: 0 }
  );
};

export default useProductDetailData;
