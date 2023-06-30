import React, { useRef, useState } from 'react';

import Icon from '@atoms/Icon';
import { $CarouselContainer, $SlideContainer, $OrderCircleContainer, $SlideWrapper } from './Carousel.style';

interface CarouselProps {
  children: React.ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const touchStartPositionX = useRef(0);
  const touchEndPositionX = useRef(0);
  const countArray = new Array(React.Children.count(children)).fill(null);

  const handleSlideClick = (index: number) => {
    setCurrentSlideIndex(index);
  };

  return (
    <$CarouselContainer>
      <$SlideContainer
        currentSlideIndex={currentSlideIndex}
        onTouchStart={e => {
          touchStartPositionX.current = e.touches[0].clientX;
        }}
        onTouchEnd={e => {
          touchEndPositionX.current = e.changedTouches[0].clientX;
          const touchPositionDifference = touchStartPositionX.current - touchEndPositionX.current;

          if (touchPositionDifference > 5) {
            if (currentSlideIndex >= React.Children.count(children) - 1) {
              return;
            }
            setCurrentSlideIndex(currentSlideIndex + 1);
          }
          if (touchPositionDifference < -5) {
            if (currentSlideIndex <= 0) {
              return;
            }
            setCurrentSlideIndex(currentSlideIndex - 1);
          }
        }}
      >
        {children}
      </$SlideContainer>
      <$OrderCircleContainer>
        {countArray.map((_, index) => {
          return (
            <button key={index} onClick={() => handleSlideClick(index)}>
              <Icon
                key={index}
                name="orderCircle"
                fill={index === currentSlideIndex ? '#000' : 'rgba(60, 60, 67, 0.6)'}
                width={8}
                height={8}
              />
            </button>
          );
        })}
      </$OrderCircleContainer>
    </$CarouselContainer>
  );
};

interface SlideProps {
  children: React.ReactNode;
}

const Slide = ({ children }: SlideProps) => {
  return <$SlideWrapper>{children}</$SlideWrapper>;
};

Carousel.Slide = Slide;

export default Carousel;
