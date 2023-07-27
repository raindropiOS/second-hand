import styled from 'styled-components';

const $StatusModalLayout = styled.div`
  position: absolute;
  top: 31px;
  left: -1px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
  border-top: none;
  border-bottom: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.DEFAULT};
  width: 106px;
  z-index: 999;
`;

const $StatusButton = styled.button`
  display: flex;

  height: 32px;
  padding: 0 16px;
  justify-content: space-between;
  align-items: center;
  gap: 4px;

  font-weight: ${({ theme }) => theme.FONT_TOKEN.CAPTION_1.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.CAPTION_1.FONT_SIZE};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.STRONG};

  border-bottom: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
`;

export { $StatusModalLayout, $StatusButton };
