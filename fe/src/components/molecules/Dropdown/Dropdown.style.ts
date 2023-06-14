import styled, { css } from 'styled-components';

const $DropdownContainer = styled.div`
  position: relative;
  width: fit-content;
`;

const $DropdownButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  width: fit-content;

  font-weight: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.LINE_HEIGHT};
`;

const $DropdownLayout = styled.section`
  position: absolute;
  width: 240px;
  height: fit-content;

  border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.STRONG};
  border-radius: 12px;
`;

const $MyTownButton = styled.button`
  padding-left: 16px;
  width: 100%;
  height: 45px;
  font-weight: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.STRONG};
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
  text-align: left;
`;

const $SettingTownButton = styled.button`
  padding-left: 16px;
  height: 45px;
  font-weight: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.STRONG};
`;

export { $DropdownContainer, $DropdownButton, $DropdownLayout, $MyTownButton, $SettingTownButton };
