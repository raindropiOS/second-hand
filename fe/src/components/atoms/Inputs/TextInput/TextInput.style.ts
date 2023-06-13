import styled, { css } from 'styled-components';

export type TextInputCategory = 'default' | 'chat' | 'search';

const $TextInputLayout = styled.div<{ width: number; category?: TextInputCategory }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: ${({ width }) => width}px;

  ${({ category }) =>
    category === 'default' &&
    css`
      background: transparent;
      border-bottom: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
    `};
  ${({ category }) =>
    category === 'chat' &&
    css`
      background: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.DEFAULT};
      border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
      border-radius: 18px;
      gap: 0;
    `};
  ${({ category }) =>
    category === 'search' &&
    css`
      padding: 0 12px;
      background: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.BOLD};
      border-radius: 18px;
    `};
`;

const $TextInput = styled.input`
  width: 100%;
  height: 36px;
  padding: 4px 12px;

  font-weight: ${({ theme }) => theme.FONT_TOKEN.CALLOUT.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.CALLOUT.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.CALLOUT.LINE_HEIGHT};

  &::placeholder {
    color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.WEAK};
  }
  caret-color: ${({ theme }) => theme.COLORS.SYSTEM.DEFAULT};
`;

export { $TextInputLayout, $TextInput };
