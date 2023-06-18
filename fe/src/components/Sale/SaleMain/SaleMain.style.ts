import styled from 'styled-components';

const $SaleMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
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

export { $SaleMain, $CategoriesLayout, $RecommendCategories, $SelectCategoryButton };
