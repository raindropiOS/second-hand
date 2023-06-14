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
});

export default PATH;
