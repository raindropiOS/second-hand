import styled from 'styled-components';

const $ListItemContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const $SaleButtonContainer = styled.div`
  position: absolute;
  z-index: 9999;
  right: 40px;
  bottom: -10px;
`;

export { $ListItemContainer, $SaleButtonContainer };
