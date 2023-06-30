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
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb2dpbl9tZW1iZXIiLCJtZW1iZXJJZCI6MTAxLCJleHAiOjE2ODg4ODAxOTZ9.4oB8T0_DRvsFqDihHMa6i_ujTtVKpMfL_jTigPf74Zg';
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosFetch;
// TODO(hoonding): socketPath 알아보기.
