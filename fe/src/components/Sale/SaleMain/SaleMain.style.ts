import styled from 'styled-components';

const $SaleMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
`;

const $SaleForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const $CategoriesLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
`;

const $RecommendCategories = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 4px;
`;

const $SelectCategoryButton = styled.button`
  width: 11px;
  height: 22px;
`;

const $ContentTextArea = styled.textarea`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  resize: none;
  width: 100%;
  max-height: calc(100% - 320px);
  min-height: 300px;
  padding: 15px 12px;
  background: transparent;
  border-top: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
  font-weight: ${({ theme }) => theme.FONT_TOKEN.CALLOUT.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.CALLOUT.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.CALLOUT.LINE_HEIGHT};

  overflow: auto;
  &::placeholder {
    color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.WEAK};
  }
  caret-color: ${({ theme }) => theme.COLORS.SYSTEM.DEFAULT};
`;

export { $SaleMain, $SaleForm, $CategoriesLayout, $RecommendCategories, $SelectCategoryButton, $ContentTextArea };
