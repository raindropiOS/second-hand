import axios from 'axios';

import { KAKAO_BASE_API_URL } from '@constants/API';

const kakaoFetch = axios.create({
  baseURL: KAKAO_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
  },
});

export default kakaoFetch;
// TODO(hoonding): socketPath 알아보기.
