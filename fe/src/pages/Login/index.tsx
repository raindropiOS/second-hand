import React from 'react';

import MainTabBar from '@components/molecules/TabBars/MainTabBar';
import { $LoginLayout, $LoginHeader, $LoginButton, $ProfileImage } from './Login.style';
import Icon from '@atoms/Icon';

const Login = () => {
  const handleLoginBtnClick = () => {
    const scope = 'user';
    const redirectURI = process.env.REACT_APP_REDIRECT_URI;
    const clientId = process.env.REACT_APP_CLIENT_ID;

    window.location.href = `https://github.com/login/oauth/authorize?response_type=code&redirect_uri=${redirectURI}&client_id=${clientId}&scope=${scope}`;
  };

  return (
    <$LoginLayout>
      <$LoginHeader>내 계정</$LoginHeader>
      <$ProfileImage>
        <Icon name="camera" width={40} height={35} />
      </$ProfileImage>
      <$LoginButton onClick={handleLoginBtnClick}>
        <Icon name="github" width={40} height={40} />
        깃허브로 로그인하기
      </$LoginButton>
      <MainTabBar />
    </$LoginLayout>
  );
};

export default Login;
