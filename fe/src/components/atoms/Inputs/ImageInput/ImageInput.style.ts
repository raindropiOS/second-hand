import styled, { css } from 'styled-components';

const $ImageInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;

  width: 80px;
  height: 80px;

  border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
  border-radius: 12px;

  cursor: pointer;
`;

const $ImageInputCount = styled.span`
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.STRONG};
  font-weight: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.LINE_HEIGHT};
`;

const $ImageInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

export { $ImageInputLabel, $ImageInputCount, $ImageInput };
