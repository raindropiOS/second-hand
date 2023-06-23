import styled, { css } from 'styled-components';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonStatus = 'default' | 'active' | 'ghost';
export type ButtonJustifyContent = 'center' | 'between';

const sizeStyles = {
  small: css`
    height: 32px;
    width: fit-content;
    padding: 0 16px;

    font-weight: ${({ theme }) => theme.FONT_TOKEN.CAPTION_1.FONT_WEIGHT};
    font-size: ${({ theme }) => theme.FONT_TOKEN.CAPTION_1.FONT_SIZE};
    line-height: ${({ theme }) => theme.FONT_TOKEN.CAPTION_1.LINE_HEIGHT};
  `,
  medium: css`
    height: 52px;
    width: 177.5px;
    padding: 16px 20px;

    font-weight: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_WEIGHT};
    font-size: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_SIZE};
    line-height: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.LINE_HEIGHT};
  `,
  large: css`
    height: 52px;
    width: 361px;
    padding: 16px 20px;

    font-weight: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_WEIGHT};
    font-size: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_SIZE};
    line-height: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.LINE_HEIGHT};
  `,
};

const justifyContentStyles = {
  center: css`
    justify-content: center;
  `,
  between: css`
    justify-content: space-between;
  `,
};

const statusStyles = {
  default: css`
    border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
    background-color: ${({ theme }) => theme.COLORS.ACCENT.TEXT.DEFAULT};
    color: ${({ theme }) => theme.COLORS.ACCENT.TEXT.WEAK};
  `,
  active: css`
    background-color: ${({ theme }) => theme.COLORS.ACCENT.BACKGROUND.PRIMARY};
    color: ${({ theme }) => theme.COLORS.ACCENT.TEXT.DEFAULT};
  `,
  ghost: css`
    padding: 0;
    background-color: ${({ theme }) => theme.COLORS.ACCENT.TEXT.DEFAULT};
    color: ${({ theme }) => theme.COLORS.ACCENT.TEXT.WEAK};
  `,
};

const $Button = styled.button<{ size: ButtonSize; status: ButtonStatus; justifyContent: ButtonJustifyContent }>`
  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 8px;

  ${props => sizeStyles[props.size]}
  ${props => justifyContentStyles[props.justifyContent]}
  ${props => statusStyles[props.status]}
`;

export { $Button };
