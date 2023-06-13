import styled, { css } from 'styled-components';

const $ModalLayout = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.OVERLAY.DEFAULT};
`;

const commonButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  // TODO(hoonding): width 바꿔야함.
  width: 377px;
  height: 61px;
  background-color: transparent;
  color: ${({ theme }) => theme.COLORS.SYSTEM.DEFAULT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.TITLE_3.FONT_SIZE};
  font-weight: ${({ theme }) => theme.FONT_TOKEN.TITLE_3.FONT_WEIGHT};
  border-bottom: 0.3px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.STRONG};

  &:hover {
    opacity: 0.8;
  }
`;

const $CancelButton = styled.button`
  ${commonButtonStyle};
  margin-bottom: 11px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.COLORS.SYSTEM.BACKGROUND.DEFAULT};
  border-bottom: none;
  border-radius: 13px;
`;

const $ModalButtons = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow: hidden;
  width: 377px;
  border-radius: 13px;
  background-color: ${({ theme }) => theme.COLORS.SYSTEM.BACKGROUND.WEAK};
`;

const $ModalFirstButton = styled.button`
  ${commonButtonStyle};
  color: ${({ theme }) => theme.COLORS.SYSTEM.WARNING};
  border-bottom: none;
`;

const $ModalButton = styled.button`
  ${commonButtonStyle};
`;

export { $ModalLayout, $CancelButton, $ModalButtons, $ModalFirstButton, $ModalButton };
