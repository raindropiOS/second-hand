import styled, { css } from 'styled-components';

const $Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 361px;
  height: 150px;
  padding: 15px 0;
  gap: 15px;
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

const $TextInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 226px;
  height: 120px;
  padding: 4px 0;
  gap: 4px;
`;

const $TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 226px;
  height: 20px;
`;

const $Title = styled.div`
  font-weight: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.DEFAULT};
`;

const $LocationTimestamp = styled.div`
  font-weight: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.WEAK};
`;

const $StatusPriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  gap: 4px;
`;

const $Status = styled.div`
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

const $Price = styled.div`
  font-weight: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.STRONG};
`;

const $ChatLikeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  padding-top: 24px;
  gap: 4px;

  font-weight: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.DEFAULT};

  justify-self: end;
  align-self: end;
`;

export {
  $Wrapper,
  $Image,
  $TextInfoWrapper,
  $TitleWrapper,
  $Title,
  $LocationTimestamp,
  $StatusPriceWrapper,
  $Status,
  $Price,
  $ChatLikeWrapper,
};
