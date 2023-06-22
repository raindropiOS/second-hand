import styled from 'styled-components';

const $SegmentedButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 120px;
  height: 28px;

  font-weight: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.LINE_HEIGHT};
  background-color: transparent;

  z-index: 3;
`;

export { $SegmentedButton };
