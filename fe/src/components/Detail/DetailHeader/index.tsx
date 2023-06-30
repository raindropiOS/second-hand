import React from 'react';

import Navbar from '@molecules/Navbar';
import Icon from '@atoms/Icon';
import Carousel from '@molecules/Carousel';
import { useNavigate } from 'react-router-dom';
import Button from '@atoms/Buttons/Button';

interface DetailHeaderProps {
  imgUrls?: string[];
  isMine: boolean | undefined;
}

const DetailHeader = ({ imgUrls, isMine }: DetailHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar isTransparent={true}>
        <Button onClick={() => navigate(-1)} status="ghost">
          <Icon name="chevronLeft" />
        </Button>
        {isMine && (
          <Button onClick={() => console.log('modal page')} status="ghost">
            <Icon name="more" />
          </Button>
        )}
      </Navbar>
      <Carousel>
        {imgUrls?.map((url, index) => (
          <Carousel.Slide key={index}>
            <img src={url} alt="carousel" />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
};

export default DetailHeader;
