import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { PRODUCTS } from '@constants/API';
import { SaleHistoryProductsType, APIDefaultResponseType } from '@type/productsType';

import mockAxiosFetch from '../instances/mockAxiosFetch';

const getSaleHistoryProducts = async (pageNum?: number, status?: number) => {
  const response = await mockAxiosFetch.get(PRODUCTS.GET_SALE_HISTORY_PRODUCTS, {
    params: {
      pageNum: pageNum,
      status: status,
    },
  });

  return response.data;
};

const useSaleHistoryProductsData = (pageNum?: number, status?: number) => {
  return useQuery<APIDefaultResponseType<SaleHistoryProductsType>, AxiosError, SaleHistoryProductsType>(
    ['likeProducts', pageNum, status],
    () => getSaleHistoryProducts(pageNum, status),
    { select: data => data.data }
  );
};

export default useSaleHistoryProductsData;
