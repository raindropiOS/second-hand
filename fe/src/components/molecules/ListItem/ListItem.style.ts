import styled, { css } from 'styled-components';

const $ListItemLayout = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;

  width: 100%;
  height: 150px;
  padding: 15px 0;
  border-bottom: ${({ theme }) => `1px solid ${theme.COLORS.NEUTRAL.BORDER.DEFAULT}`};

  cursor: pointer;
`;

const $Image = styled.img`
  width: 120px;
  height: 120px;
  border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
  border-radius: 8px;

  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.WEAK};
`;

const $TextInfoLayout = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;

  width: calc(100% - 152px);
  height: 120px;
  padding: 4px 0;
`;

const $TitleLayout = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 20px;
`;

const $Title = styled.p`
  width: fit-content;
  height: fit-content;
  font-weight: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.DEFAULT};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const $LocationTimestamp = styled.p`
  font-weight: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.WEAK};
`;

const $StatusPriceLayout = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
`;

const $Status = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 22px;
  padding: 10px 8px;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.COLORS.ACCENT.BACKGROUND.SECONDARY};

  font-weight: ${({ theme }) => theme.FONT_TOKEN.CAPTION_1.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.CAPTION_1.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.CAPTION_1.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.ACCENT.TEXT.DEFAULT};
`;

const $Price = styled.p`
  font-weight: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.STRONG};
`;

const $ChatLikeLayout = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  align-self: flex-end;
  gap: 4px;

  padding-top: 24px;

  font-weight: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.DEFAULT};
`;

export {
  $ListItemLayout,
  $Image,
  $TextInfoLayout,
  $TitleLayout,
  $Title,
  $LocationTimestamp,
  $StatusPriceLayout,
  $Status,
  $Price,
  $ChatLikeLayout,
};
