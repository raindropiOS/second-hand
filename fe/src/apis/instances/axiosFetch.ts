import axios from 'axios';

import { BASE_API_URL } from '@constants/API';

const axiosFetch = axios.create({
  baseURL: BASE_API_URL,
});

axiosFetch.interceptors.request.use(
  config => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;
    else
      config.headers['Authorization'] =
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6NCwiaWF0IjoxNjg5NzM2NTA2LCJleHAiOjE2OTA2MDA1MDZ9.jQXCPKUiIFxhm1QvtnEXXKAW3lR7rx7YREGNveGjsqo';
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosFetch;
// TODO(hoonding): socketPath 알아보기.
