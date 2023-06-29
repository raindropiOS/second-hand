import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { PRODUCTS } from '@constants/API';
import { DetailProductType, APIDefaultResponseType } from '@type/productsType';

import axiosFetch from '@apis/instances/axiosFetch';

const getProductDetail = async (productId: string) => {
  const response = await axiosFetch.get(`/products/${productId}`);

  return response.data;
};

export const changeLikeStatus = async (productId: string, isLiked: boolean) => {
  const response = await axiosFetch.patch(`/products/${productId}`, {
    isLiked,
  });
};
const useProductDetailData = (
  productId: string,
  setProductDetail: React.Dispatch<React.SetStateAction<DetailProductType>>
) => {
  return useQuery<APIDefaultResponseType<DetailProductType>, AxiosError, DetailProductType>(
    ['productDetail', productId],
    () => getProductDetail(productId),
    { select: data => data.data, cacheTime: 0, staleTime: 0, onSuccess: setProductDetail }
  );
};

export default useProductDetailData;
