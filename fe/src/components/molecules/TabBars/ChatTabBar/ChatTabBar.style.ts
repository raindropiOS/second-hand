import styled from 'styled-components';

const $ChatTabBar = styled.footer`
  display: flex;
  align-items: center;

  flex-direction: flex-start;
  gap: 8px;
  padding: 0px 25px;
  /* TODO(hoonding): width 100%로 바꾸기. */
  width: 100%;
  height: 83px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.WEAK};
`;

const $ChatInput = styled.input`
  width: 80%;
  height: 45px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.DEFAULT};
  border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
  border-radius: 18px;
  padding: 6px 12px;
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.STRONG};
  font-size: ${({ theme }) => theme.FONT_TOKEN.BODY.FONT_SIZE};
  font-weight: ${({ theme }) => theme.FONT_TOKEN.BODY.FONT_WEIGHT};
  caret-color: ${({ theme }) => theme.COLORS.SYSTEM.DEFAULT};

  &::placeholder {
    color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.WEAK};
  }
`;

const $SendButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  background-color: ${({ theme }) => theme.COLORS.ACCENT.BACKGROUND.PRIMARY};
  border-radius: 50%;
`;

export { $ChatTabBar, $SendButton, $ChatInput };
