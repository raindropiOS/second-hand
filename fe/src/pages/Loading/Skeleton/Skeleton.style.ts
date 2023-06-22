import styled, { css } from 'styled-components';

const $ListItemLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;

  width: 100%;
  height: 150px;
  padding: 15px 0;
  border-bottom: ${({ theme }) => `1px solid ${theme.COLORS.NEUTRAL.BORDER.DEFAULT}`};
`;

const $Image = styled.div`
  width: 120px;
  height: 120px;
  border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.BOLD};
`;

const $TextInfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;

  width: calc(100% - 152px);
  height: 120px;
  padding: 4px 0;
`;

const $TitleLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 20px;
`;

const $Title = styled.div`
  width: 300px;
  height: 20px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.BOLD};
  font-weight: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.DEFAULT};
`;

const $LocationTimestamp = styled.div`
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.BOLD};
  width: 200px;
  height: 15px;
`;

const $StatusPriceLayout = styled.div`
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
  width: 50px;
  padding: 10px 8px;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.BOLD};
`;

const $Price = styled.div`
  height: 22px;
  width: 120px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.BOLD};
`;

const $ChatLikeLayout = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  align-self: flex-end;
  gap: 4px;
  padding-top: 24px;
`;

const $ChatDiv = styled.div`
  height: 22px;
  width: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.BOLD};
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
  $ChatDiv,
};
