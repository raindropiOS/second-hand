import styled from 'styled-components';

const $SaleCategoryMain = styled.main`
  overflow: auto;
  font-size: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_SIZE};
  font-weight: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_WEIGHT};
`;

const $CategoryLists = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const $CategoryList = styled.li<{ active: boolean }>`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0px;
  width: 100%;
  height: 52px;
  color: ${({ theme, active }) =>
    active ? theme.COLORS.ACCENT.BACKGROUND.PRIMARY : theme.COLORS.NEUTRAL.TEXT.DEFAULT};
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
`;

export { $SaleCategoryMain, $CategoryLists, $CategoryList };
