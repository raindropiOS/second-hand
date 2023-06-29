import styled from 'styled-components';

interface $SlideContainerProps {
  currentSlideIndex: number;
}

const $CarouselContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 390px;

  overflow: hidden;
`;

const $SlideContainer = styled.section<$SlideContainerProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  width: 390px;

  transition: transform 0.5s ease-in-out;
  transform: translateX(${({ currentSlideIndex }) => currentSlideIndex * -390}px);
`;

const $SlideWrapper = styled.div`
  width: fit-content;
  height: 100%;

  & > img {
    width: 390px;
    height: 435px;
    max-width: 390px;
  }
`;

const $OrderCircleContainer = styled.section`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  bottom: 22px;
  z-index: 9999;
`;

export { $CarouselContainer, $SlideContainer, $SlideWrapper, $OrderCircleContainer };
