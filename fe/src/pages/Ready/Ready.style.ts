import styled from 'styled-components';

const $ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;

  height: 100vh;
`;

const $ImageWrapper = styled.section`
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite 10s linear;
  }
`;

const $TextWrapper = styled.p`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_WEIGHT};
  line-height: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.DEFAULT};
`;

export { $ImageContainer, $ImageWrapper, $TextWrapper };
