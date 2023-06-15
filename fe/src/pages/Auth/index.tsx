import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PATH from '@constants/routerPath';
import { AUTH } from '@constants/API';
import axiosFetch from 'src/apis/axiosSetting';

const Auth = () => {
  const navigate = useNavigate();
  const currentURL = new URL(window.location.href);
  const authorizationCode = currentURL.searchParams.get('code');

  useEffect(() => {
    const getAccessToken = async () => {
      // Type Guard
      // TODO(hoonding): authorizationCode가 없을 경우 처리
      if (!authorizationCode) return;
      const { data } = await axiosFetch.get(AUTH.LOGIN(authorizationCode));

      const accessToken = data.accessToken;

      if (!sessionStorage.getItem('accessToken')) sessionStorage.setItem('accessToken', accessToken);
      navigate(PATH.HOME.DEFAULT);
    };

    getAccessToken();
  }, [window.location]);

  return <></>;
};

export default Auth;
