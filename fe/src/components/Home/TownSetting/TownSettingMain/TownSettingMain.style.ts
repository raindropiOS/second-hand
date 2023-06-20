import styled from 'styled-components';

const $TownSettingMainText = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 150px;
  font-weight: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.LINE_HEIGHT};
`;

export { $TownSettingMainText };
