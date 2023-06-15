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

    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosFetch;
// TODO(hoonding): socketPath 알아보기.
