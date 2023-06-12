import styled, { css } from 'styled-components';

export type TextInputCategory = 'default' | 'chat';

const $TextInput = styled.input<{ width: number; category?: TextInputCategory }>`
  width: ${({ width }) => width}px;
  height: 36px;
  padding: 4px 12px;

  font-weight: ${({ theme }) => theme.FONT_TOKEN.CALLOUT.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.CALLOUT.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.CALLOUT.LINE_HEIGHT};

  &::placeholder {
    color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.WEAK};
  }
  caret-color: ${({ theme }) => theme.COLORS.SYSTEM.DEFAULT};

  ${({ category }) =>
    category === 'default' &&
    css`
      background: transparent;
    `};
  ${({ category }) =>
    category === 'chat' &&
    css`
      background: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.DEFAULT};
      border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
      border-radius: 18px;
    `};
`;

export { $TextInput };
