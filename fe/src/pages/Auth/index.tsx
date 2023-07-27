import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PATH from '@constants/routerPath';
import { AUTH } from '@constants/API';
import axiosFetch from 'src/apis/instances/axiosFetch';
import Skeleton from '@pages/Loading/Skeleton';

const Auth = () => {
  const navigate = useNavigate();
  const currentURL = new URL(window.location.href);
  const authorizationCode = currentURL.searchParams.get('code');
  let ignore = false;

  useEffect(() => {
    const getAccessToken = async () => {
      // Type Guard
      // TODO(hoonding): authorizationCode가 없을 경우 처리
      if (!authorizationCode) return;

      // FIXME(jayden): 일단 KAKAO부터 테스트. 추후에 GITHUB도 되게 수정할 것
      const {
        data: {
          data: { jwtToken },
        },
      } = await axiosFetch.post(AUTH.LOGIN, { authorizationCode });
      const { accessToken, refreshToken } = jwtToken;

      if (!sessionStorage.getItem('accessToken')) {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
      }
      const {
        data: {
          data: { name, imgUrl },
        },
      } = await axiosFetch.get(AUTH.MEMBERS);

      sessionStorage.setItem('name', name);
      sessionStorage.setItem('imgUrl', imgUrl);

      navigate(PATH.HOME.DEFAULT);
    };

    if (!ignore) getAccessToken();

    return () => {
      ignore = true;
    };
  }, [window.location]);

  return <Skeleton />;
};

export default Auth;
