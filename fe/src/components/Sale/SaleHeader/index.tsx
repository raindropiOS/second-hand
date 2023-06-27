import React from 'react';
import { useNavigate } from 'react-router-dom';

import PATH from '@constants/routerPath';
import Navbar from '@components/molecules/Navbar';
import Button from '@atoms/Buttons/Button';

import { $SubmitButton } from './SaleHeader.style';
interface SaleHeaderProps {
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  canAllowSubmit: boolean;
}

const SaleHeader = ({ handleSubmit, canAllowSubmit }: SaleHeaderProps) => {
  // TODO(hoonding): 완료 누르면 sessionStorage 비우기.

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    // TODO(hoonding): sessionStorage에 작성중이던 form 저장하기.
    navigate(PATH.HOME.DEFAULT);
  };

  return (
    <Navbar>
      <Button onClick={handleBackButtonClick} status="ghost">
        <span>뒤로</span>
      </Button>
      <span>내 물건 팔기</span>
      <$SubmitButton onClick={handleSubmit} submit={canAllowSubmit} type="button" status="ghost">
        <span>완료</span>
      </$SubmitButton>
    </Navbar>
  );
};

export default SaleHeader;
