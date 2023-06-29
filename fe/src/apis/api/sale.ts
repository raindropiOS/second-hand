import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { PRODUCTS } from '@constants/API';
import { LikeProductsType, APIDefaultResponseType } from '@type/productsType';
// TODO(hoonding) : axiosFetch로 변경해야함
import mockAxiosFetch from '../instances/mockAxiosFetch';

const postNewProduct = async (formData: FormData) => {
  const response = await mockAxiosFetch.post(PRODUCTS.POST_NEW_PRODUCT, formData);

  return response.data;
};

const usePostNewProduct = () => {
  return useMutation(postNewProduct);
};

export default usePostNewProduct;
