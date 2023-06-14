const BASE_API_URL = `${process.env.REACT_APP_BASE_URL}/api`;

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
  GET_ALL_CATEGORIES: `${BASE_API_URL}/${API_TYPE.CATEGORIES}`,
});

const PRODUCTS = Object.freeze({
  GET_PRODUCTS: (pageNum = null, townId = null, categoryId = null) => `${BASE_API_URL}/${API_TYPE.PRODUCTS}`,
});

const TOWNS = Object.freeze({});

const AUTH = Object.freeze({
  LOGIN: (AUTHORIZATION_CODE: string) => `${BASE_API_URL}/${API_TYPE.AUTH}/login?code=${AUTHORIZATION_CODE}`,
});

export { CATEGORIES, PRODUCTS, TOWNS, AUTH };
