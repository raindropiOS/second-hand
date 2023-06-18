import React, { useState, useEffect } from 'react';

import { AUTH, KAKAO } from '@constants/API';

import kakaoFetch from 'src/apis/instances/kakaoFetch';
import useCurrentLocation from '@hooks/useCurentLocation';

import MainTabBar from '@components/molecules/TabBars/MainTabBar';
import Icon from '@atoms/Icon';
import LoginHeader from '@components/Login/LoginHeader';
import LoginMain from '@components/Login/LoginMain';

import { $Template } from '@styles/PageTemplate.style';
import { $LoginLayout, $LoginHeader, $LoginButton, $ProfileImage } from './Login.style';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};

const Login = () => {
  const { location, error } = useCurrentLocation(geolocationOptions);

  const handleLoginBtnClick = () => {
    const scope = 'user';
    const redirectURI = process.env.REACT_APP_REDIRECT_URI as string;
    const clientId = process.env.REACT_APP_CLIENT_ID as string;

    window.location.href = AUTH.GITHUB_LOGIN_URL(redirectURI, clientId, scope);
  };

  useEffect(() => {
    if (location.latitude === 0) return;
    const getCurrentTown = async (latitude: number, longitude: number) => {
      const { data } = await kakaoFetch.get(KAKAO.GET_CURRENT_LOCATION(latitude, longitude));
      const address = data.documents[0].address;

      console.log(`${address.region_1depth_name} ${address.region_2depth_name} ${address.region_3depth_name}`);
    };

    getCurrentTown(location.latitude, location.longitude);
  }, [location]);

  return (
    <$Template>
      <LoginHeader />
      <LoginMain onClick={handleLoginBtnClick} />
      <MainTabBar />
    </$Template>
  );
};

export default Login;
