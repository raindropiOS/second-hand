import React from 'react';

import { $LoginMain, $LoginButton, $ProfileImage } from './LoginMain.style';
import Icon from '@atoms/Icon';

interface LoginMainProps {
  onClick: () => void;
  region: string;
}

const LoginMain = ({ onClick, region }: LoginMainProps) => {
  return (
    <$LoginMain>
      {region}
      <$ProfileImage>
        <Icon name="camera" width={40} height={35} />
      </$ProfileImage>
      <$LoginButton onClick={onClick}>
        <Icon name="github" width={40} height={40} />
        깃허브로 로그인하기
      </$LoginButton>
    </$LoginMain>
  );
};

export default LoginMain;
