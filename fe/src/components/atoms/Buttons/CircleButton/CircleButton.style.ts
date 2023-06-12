import styled, { css } from 'styled-components';

export type CircleButtonSize = 'small' | 'large';

const $CircleButton = styled.button<{ size: CircleButtonSize }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.ACCENT.BACKGROUND.PRIMARY};
  > svg {
    fill: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.DEFAULT};
  }
  ${props =>
    props.size === 'small' &&
    css`
      width: 28px;
      height: 28px;
      border-radius: 28px;
      > svg {
        width: 12px;
        height: 12px;
      }
    `}
  ${props =>
    props.size === 'large' &&
    css`
      width: 56px;
      height: 56px;
      border-radius: 56px;
      > svg {
        width: 18px;
        height: 18px;
      }
    `}
`;

export { $CircleButton };
