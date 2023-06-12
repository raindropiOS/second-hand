import styled, { css } from 'styled-components';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonStatus = 'default' | 'active';
export type ButtonJustifyContent = 'center' | 'between';

const $Button = styled.button<{ size: ButtonSize; status: ButtonStatus; justifyContent: ButtonJustifyContent }>`
  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 8px;

  ${props =>
    props.size === 'small' &&
    css`
      height: 32px;
      width: fit-content;
      padding: 0 16px;

      font-weight: ${({ theme }) => theme.FONT_TOKEN.CAPTION_1.FONT_WEIGHT};
      font-size: ${({ theme }) => theme.FONT_TOKEN.CAPTION_1.FONT_SIZE};
      line-height: ${({ theme }) => theme.FONT_TOKEN.CAPTION_1.LINE_HEIGHT};
    `}

  ${props =>
    props.size === 'medium' &&
    css`
      height: 52px;
      width: 177.5px;
      padding: 16px 20px;

      font-weight: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_WEIGHT};
      font-size: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_SIZE};
      line-height: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.LINE_HEIGHT};
    `}

  ${props =>
    props.size === 'large' &&
    css`
      height: 52px;
      width: 361px;
      padding: 16px 20px;

      font-weight: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_WEIGHT};
      font-size: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_SIZE};
      line-height: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.LINE_HEIGHT};
    `}
  
  ${props =>
    props.justifyContent === 'center' &&
    css`
      justify-content: center;
    `}
  
  ${props =>
    props.justifyContent === 'between' &&
    css`
      justify-content: space-between;
    `}
  
  ${props =>
    props.status === 'default' &&
    css`
      background-color: ${({ theme }) => theme.COLORS.ACCENT.TEXT.DEFAULT};
      border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};

      color: ${({ theme }) => theme.COLORS.ACCENT.TEXT.WEAK};
    `}
  
  ${props =>
    props.status === 'active' &&
    css`
      background-color: ${({ theme }) => theme.COLORS.ACCENT.BACKGROUND.PRIMARY};

      color: ${({ theme }) => theme.COLORS.ACCENT.TEXT.DEFAULT};
    `}
`;

export { $Button };
