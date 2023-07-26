import React from 'react';

import LoginHeader from '@components/Login/LoginHeader';
import LoginMain from '@components/Login/LoginMain';

import { $Template } from '@styles/PageTemplate.style';
import { Outlet } from 'react-router-dom';

const Login = () => {
  return (
    <$Template>
      <LoginHeader />
      <LoginMain />
      <Outlet />
    </$Template>
  );
};

export default Login;
