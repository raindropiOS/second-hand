const PATH = Object.freeze({
  HOME: {
    DEFAULT: '/home',
    TOWN_SETTING: '/home/town-setting',
    TOWN_SEARCH: '/home/town-setting/search',
    CATEGORY: '/home/category',
  },
  SALE: {
    DEFAULT: '/sale',
    CATEGORY: '/sale/category',
  },
  PRODUCT: {
    DEFAULT: '/product/:productId',
    CHAT: '/product/:productId/chat/:chatId',
    SALES: '/product/sales',
    LIKE: '/product/like',
  },
  AUTH: {
    DEFAULT: '/auth',
    LOGIN: '/auth/login',
    SETTING: '/auth/setting',
  },
  IS_CLICKED_ID: {
    HOME: 1,
    SALES: 2,
    LIKE: 3,
    CHAT: 4,
    LOGIN: 5,
  },
});

export default PATH;
