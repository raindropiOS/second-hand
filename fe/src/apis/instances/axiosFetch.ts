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
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb2dpbl9tZW1iZXIiLCJtZW1iZXJJZCI6MTAxLCJleHAiOjE2ODk4MjE3ODh9.Fy15EgI6b7TRtov_Sck6GSvkij6l-yC_uzCco0TDG5k';
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosFetch;
// TODO(hoonding): socketPath 알아보기.
