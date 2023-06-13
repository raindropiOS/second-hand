import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@styles/GlobalStyles.style';
import { theme } from '@styles/theme';

import Login from '@pages/Login';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" />
          <Route path="/home/town-setting" />
          <Route path="/home/town-setting/search" />
          <Route path="/home/category" />

          <Route path="/sale" />
          <Route path="/sale/category" />

          <Route path="/product/:productId" />
          <Route path="/product/:productId/chat/:chatId" />
          <Route path="/product/sales" />
          <Route path="/product/like" />

          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/setting" />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
