import styled, { css } from 'styled-components';

const $ModalLayout = styled.section`
  position: absolute;
  bottom: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.OVERLAY.DEFAULT};
`;

const $ButtonsLayout = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const commonButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  // TODO(hoonding): width 바꿔야함.
  width: 100%;
  max-width: 767px;
  height: 61px;
  background-color: transparent;
  color: ${({ theme }) => theme.COLORS.SYSTEM.DEFAULT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.TITLE_3.FONT_SIZE};
  font-weight: ${({ theme }) => theme.FONT_TOKEN.TITLE_3.FONT_WEIGHT};
  border-bottom: 0.3px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.STRONG};
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
  width: 100%;
  max-width: 767px;
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

  opacity: 0.8;
`;

export { $ModalLayout, $ButtonsLayout, $CancelButton, $ModalButtons, $ModalFirstButton, $ModalButton };
