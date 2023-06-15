import styled from 'styled-components';

const $SaleTabBar = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: flex-start;
  padding: 0px 25px;
  /* TODO(hoonding): width 100%로 바꾸기. */
  width: 100%;
  height: 83px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.WEAK};
`;

const $TownSetting = styled.button`
  display: flex;
  align-items: center;
  height: max-content;
  font-size: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_SIZE};
  font-weight: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_WEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.DEFAULT};
  gap: 5px;
  &:hover {
    & > svg {
      fill: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.STRONG};
    }
    color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.STRONG};
  }
`;

const $KeyboardDown = styled.button`
  &:hover {
    & > svg {
      fill: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.STRONG};
    }
  }
`;

export { $SaleTabBar, $TownSetting, $KeyboardDown };
