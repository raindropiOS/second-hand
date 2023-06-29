export const BASE_API_URL = `${process.env.REACT_APP_BASE_URL}/api`;
export const KAKAO_BASE_API_URL = `${process.env.REACT_APP_KAKAO_BASE_API_URL}`;
const API_TYPE = Object.freeze({
  CATEGORIES: 'categories',
  PRODUCTS: 'products',
  TOWNS: 'towns',
  AUTH: 'auth',
  MEMBERS: 'members',
});

const createQueryString = (...params: any[]) => {
  // pageNum = null, categoryId = null 이면 '' 반환
  // pageNum =1, categoryId = null 이면 'pageNum=1' 반환
  // pageNum = 1, categoryId = 1 이면 'pageNum=1&categoryId=1' 반환
  const queryParams: string[] = [];

  params.forEach(param => {
    if (param !== null && param !== undefined) {
      const [key, value] = param;

      queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  });

  return queryParams.join('&');
};

const CATEGORIES = Object.freeze({
  GET_ALL_CATEGORIES: `/${API_TYPE.CATEGORIES}`,
});

const PRODUCTS = Object.freeze({
  GET_PRODUCTS: (pageNum = null, townId = null, categoryId = null) => `/${API_TYPE.PRODUCTS}`,
  POST_NEW_PRODUCT: `/${API_TYPE.PRODUCTS}`,
  GET_LIKE_PRODUCTS: `/${API_TYPE.PRODUCTS}/like`,
  GET_SALE_HISTORY_PRODUCTS: `/${API_TYPE.PRODUCTS}/sales`,
});

const TOWNS = Object.freeze({});

const AUTH = Object.freeze({
  LOGIN: `/${API_TYPE.AUTH}/login`,
  MEMBERS: `/${API_TYPE.MEMBERS}`,
  GITHUB_LOGIN_URL: (clientId: string, scope: string) =>
    `https://github.com/login/oauth/authorize?response_type=code&client_id=${clientId}&scope=${scope}`,
});

const KAKAO = Object.freeze({
  GET_CURRENT_LOCATION: (longitude: number, latitude: number) =>
    `/coord2address.json?x=${latitude}&y=${longitude}&input_coord=WGS84`,
});

export { CATEGORIES, PRODUCTS, TOWNS, AUTH, KAKAO };
