import styled, { css } from 'styled-components';

const activeStyle = css`
  color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.DEFAULT};
  background-color: ${({ theme }) => theme.COLORS.ACCENT.BACKGROUND.PRIMARY};
`;

const inactiveStyle = css`
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.STRONG};
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.DEFAULT};
  border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
`;

const $ChipLayout = styled.button<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  padding: 8px 16px;
  height: 32px;
  border-radius: 50px;
  font-size: ${({ theme }) => theme.FONT_TOKEN.CAPTION_1.FONT_SIZE};
  font-weight: ${({ theme }) => theme.FONT_TOKEN.CAPTION_1.FONT_WEIGHT};
  ${({ active }) => (active ? activeStyle : inactiveStyle)}
`;

export { $ChipLayout };
