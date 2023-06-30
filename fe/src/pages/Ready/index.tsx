import React from 'react';
import { useNavigate } from 'react-router-dom';

import { $ImageContainer, $ImageWrapper, $TextWrapper } from '@pages/Ready/Ready.style';
import Button from '@atoms/Buttons/Button';

interface ReadyProps {
  isLoading?: boolean;
}

const Ready = ({ isLoading }: ReadyProps) => {
  const navigate = useNavigate();

  return (
    <$ImageContainer>
      <$ImageWrapper>
        <img alt="준비중입니다!" src="https://thumb.ac-illust.com/61/61bf2972a93c1821bb8e2654ad704d84_t.jpeg" />
      </$ImageWrapper>
      {isLoading || (
        <>
          <$TextWrapper>출시 준비 중입니다! 조금만 기다려주세요!</$TextWrapper>
          <Button onClick={() => navigate('/home')} status="active" size="large">
            홈으로 돌아가기
          </Button>
        </>
      )}
    </$ImageContainer>
  );
};

export default Ready;
