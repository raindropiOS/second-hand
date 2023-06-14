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

axiosFetch.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data;
    }
    return response;
  },
  async error => {
    if (error.response.status === 401) {
      // NOTE: 401 - Unauthorized
      //  isTokenExpired() - 토큰 만료 여부를 확인하는 함수
      //  tokenRefresh() - 토큰을 갱신해주는 함수
      //  if (isTokenExpired()) await tokenRefresh();
      //  const accessToken = getToken();
      //  error.config.headers = {
      //    'Content-Type': 'application/json',
      //     Authorization: `Bearer ${accessToken}`,
      //  };
      // 중단된 요청을(에러난 요청)을 토큰 갱신 후 재요청
      //   const response = await axios.request(error.config);
      //   return response;
    } else if (error.response.status === 403) {
      // NOTE: 403 - Forbidden
      // 403 에러가 발생하면, 로그인 페이지로 이동시킨다.
      //  history.push('/login');
    } else if (error.response.status === 404) {
      // NOTE: 404 - Not Found
      // 404 에러가 발생하면, 404 페이지로 이동시킨다.
      //  history.push('/404');
    }
  }
);

export default axiosFetch;
// TODO(hoonding): socketPath 알아보기.
