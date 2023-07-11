import styled, { css } from 'styled-components';

const $DetailMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  height: 200px;
`;

const $SellerInfoWrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 22px;
  padding: 24px;
  border-radius: 12px;

  font-weight: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.STRONG};

  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.WEAK};
`;

const $ProductInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  height: 200px;
`;

const isModalOpenStyle = css`
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
`;

const $ProductStatusButton = styled.button<{ isStatusModalOpen: boolean }>`
  position: relative;
  display: flex;
  width: 106px;
  height: 32px;
  padding: 0 16px;
  justify-content: space-between;
  align-items: center;
  gap: 4px;

  font-weight: ${({ theme }) => theme.FONT_TOKEN.CAPTION_1.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.CAPTION_1.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.CAPTION_1.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.STRONG};

  border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
  border-radius: 8px;
  ${({ isStatusModalOpen }) => isStatusModalOpen && isModalOpenStyle};
`;

const $ProductTitle = styled.h1`
  font-weight: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.STRONG};
`;

const $ProductPriceTimestamp = styled.h2`
  font-weight: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.WEAK};
`;

const $ProductDescription = styled.p`
  font-weight: ${({ theme }) => theme.FONT_TOKEN.BODY.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.BODY.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.BODY.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.DEFAULT};
`;

const $ProductSubInfoWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  font-weight: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.WEAK};
`;

export {
  $DetailMainContainer,
  $SellerInfoWrapper,
  $ProductInfoContainer,
  $ProductStatusButton,
  $ProductTitle,
  $ProductPriceTimestamp,
  $ProductDescription,
  $ProductSubInfoWrapper,
};
