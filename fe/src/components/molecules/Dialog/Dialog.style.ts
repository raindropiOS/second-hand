import styled from 'styled-components';

const $DialogContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const $DialogDimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9998;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const $DialogBoxWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 75%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  font-weight: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.DEFAULT};
  z-index: 9999;
`;

const $DialogBoxHeader = styled.div`
  width: 100%;
  height: 60%;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.STRONG};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const $DialogBoxBody = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;

  & button {
    border-right: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.STRONG};

    :first-child {
      border-bottom-left-radius: 10px;
    }

    :last-child {
      border-bottom-right-radius: 10px;
      border-right: none;
      font-weight: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_WEIGHT};
      color: ${({ theme }) => theme.COLORS.SYSTEM.WARNING};
    }
  }
`;

const $DialogBoxButton = styled.button`
  width: 100%;
  height: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.SYSTEM.BACKGROUND.WEAK};
  }
`;

export { $DialogContainer, $DialogDimmer, $DialogBoxWrapper, $DialogBoxHeader, $DialogBoxBody, $DialogBoxButton };
