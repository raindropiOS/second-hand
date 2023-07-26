import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '@molecules/Navbar';
import Icon from '@atoms/Icon';
import Carousel from '@molecules/Carousel';
import Button from '@atoms/Buttons/Button';
import useOutsideClick from '@hooks/useOutsideClick';
import { $ImageContainer } from './DetailHeader.style';
import Modal, { DETAIL_MODAL_MENUS } from '@components/molecules/Modal';
interface DetailHeaderProps {
  imgUrls?: string[];
  isMine: boolean | undefined;
}

const DetailHeader = ({ imgUrls, isMine }: DetailHeaderProps) => {
  const [isModalOpen, setIsModalOpen, ref] = useOutsideClick(false);
  const navigate = useNavigate();

  const modalHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsModalOpen(prev => !prev);
  };

  // 1. 모달 닫는 handler, 2.삭제 버튼 handler 3. 게시글 수정 page 가는 handler
  const modalClickHandlers = [(event: React.MouseEvent<HTMLButtonElement>) => modalHandler(event)];

  return (
    <>
      <Navbar isTransparent={true}>
        <Button onClick={() => navigate(-1)} status="ghost">
          <Icon name="chevronLeft" />
        </Button>
        {isMine && (
          <>
            <Button onClick={event => modalHandler(event)} status="ghost">
              <Icon name="more" />
            </Button>
            {isModalOpen && <Modal menus={DETAIL_MODAL_MENUS} onClickHandlers={modalClickHandlers} modalRef={ref} />}
          </>
        )}
      </Navbar>
      <$ImageContainer>
        <Carousel>
          {imgUrls?.map((url, index) => (
            <Carousel.Slide key={index}>
              <img src={url} alt="carousel" />
            </Carousel.Slide>
          ))}
        </Carousel>
      </$ImageContainer>
    </>
  );
};

export default DetailHeader;
