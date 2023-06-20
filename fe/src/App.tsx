import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@styles/GlobalStyles.style';
import { theme } from '@styles/theme';

import PATH from '@constants/routerPath';

import Login from '@pages/Login';
import Auth from '@pages/Auth';
import HomeMain from '@pages/Home/HomeMain';
import HomeCategory from '@pages/Home/HomeCategory';
import Sale from '@pages/Sale';
import SaleCategory from '@pages/Sale/SaleCategory';
import TownSetting from '@pages/Home/TownSetting';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={PATH.HOME.DEFAULT} />} />
          <Route path={PATH.HOME.DEFAULT} element={<HomeMain />} />
          <Route path={PATH.HOME.TOWN_SETTING} element={<TownSetting />} />
          <Route path={PATH.HOME.TOWN_SEARCH} />
          <Route path={PATH.HOME.CATEGORY} element={<HomeCategory />} />

          <Route path={PATH.SALE.DEFAULT} element={<Sale />} />
          <Route path={PATH.SALE.CATEGORY} element={<SaleCategory />} />

          <Route path={PATH.PRODUCT.DEFAULT} />
          <Route path={PATH.PRODUCT.CHAT} />
          <Route path={PATH.PRODUCT.SALES} />
          <Route path={PATH.PRODUCT.LIKE} />

          <Route path={PATH.AUTH.DEFAULT} element={<Auth />} />
          <Route path={PATH.AUTH.LOGIN} element={<Login />} />
          <Route path={PATH.AUTH.SETTING} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
