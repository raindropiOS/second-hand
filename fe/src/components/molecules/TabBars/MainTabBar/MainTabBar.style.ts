import styled from 'styled-components';

const $MainTabBar = styled.footer`
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

const $Tab = styled.button<{ clicked: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
  font-weight: 510;
  color: ${({ theme, clicked }) => (clicked ? theme.COLORS.NEUTRAL.TEXT.STRONG : theme.COLORS.NEUTRAL.TEXT.WEAK)};
  gap: 7px;

  & > svg {
    fill: ${({ theme, clicked }) => (clicked ? theme.COLORS.NEUTRAL.TEXT.STRONG : theme.COLORS.NEUTRAL.TEXT.WEAK)};
  }
  &:hover {
    & > svg {
      fill: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.STRONG};
    }
    color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.STRONG};
  }
`;

export { $Tab, $MainTabBar };
