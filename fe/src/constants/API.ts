export const BASE_API_URL = `${process.env.REACT_APP_BASE_URL}/api`;
export const KAKAO_BASE_API_URL = `${process.env.REACT_APP_KAKAO_BASE_API_URL}`;
const API_TYPE = Object.freeze({
  CATEGORIES: 'categories',
  PRODUCTS: 'products',
  TOWNS: 'towns',
  AUTH: 'auth',
});

// const createQueryString = params => {
//   const queryParams = [];

//   for (const key in params) {
//     if (params.hasOwnProperty(key) && params[key]) {
//       queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
//     }
//   }
// };

const CATEGORIES = Object.freeze({
  GET_ALL_CATEGORIES: `/${API_TYPE.CATEGORIES}`,
});

const PRODUCTS = Object.freeze({
  GET_PRODUCTS: (pageNum = null, townId = null, categoryId = null) => `/${API_TYPE.PRODUCTS}`,
});

const TOWNS = Object.freeze({});

const AUTH = Object.freeze({
  LOGIN: (AUTHORIZATION_CODE: string) => `/${API_TYPE.AUTH}/login?code=${AUTHORIZATION_CODE}`,
  GITHUB_LOGIN_URL: (clientId: string, scope: string) =>
    `https://github.com/login/oauth/authorize?response_type=code&client_id=${clientId}&scope=${scope}`,
});

const KAKAO = Object.freeze({
  GET_CURRENT_LOCATION: (longitude: number, latitude: number) =>
    `/coord2address.json?x=${latitude}&y=${longitude}&input_coord=WGS84`,
});

export { CATEGORIES, PRODUCTS, TOWNS, AUTH, KAKAO };
