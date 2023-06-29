import axios from 'axios';

import { BASE_API_URL } from '@constants/API';

const axiosFetch = axios.create({
  baseURL: BASE_API_URL,
});

axiosFetch.interceptors.request.use(
  config => {
    const accessToken = sessionStorage.getItem('accessToken');

    config.headers['Content-Type'] = 'application/json';
    if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;
    else
      config.headers['Authorization'] =
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb2dpbl9tZW1iZXIiLCJtZW1iZXJJZCI6NiwiZXhwIjoxNjg3ODU3MDgyfQ.2i5H72-SRQsgNddy7RwiFBV0KZ9us8S_SwbIKNz-v1s';
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosFetch;
// TODO(hoonding): socketPath 알아보기.
