import React, { useState, useEffect } from 'react';

import { AUTH, KAKAO } from '@constants/API';

import kakaoFetch from 'src/apis/instances/kakaoFetch';
import useCurrentRegion from '@hooks/useCurrentRegion';

import MainTabBar from '@components/molecules/TabBars/MainTabBar';
import LoginHeader from '@components/Login/LoginHeader';
import LoginMain from '@components/Login/LoginMain';

import { $Template } from '@styles/PageTemplate.style';

const Login = () => {
  const { region, error } = useCurrentRegion();

  const handleLoginBtnClick = () => {
    const scope = 'user';
    const clientId = process.env.REACT_APP_CLIENT_ID as string;

    window.location.href = AUTH.GITHUB_LOGIN_URL(clientId, scope);
  };

  return (
    <$Template>
      <LoginHeader />
      <LoginMain onClick={handleLoginBtnClick} region={region} />
      <MainTabBar />
    </$Template>
  );
};

export default Login;
