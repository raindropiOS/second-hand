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

const $CurrentCategory = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  gap: 8px;
  font-weight: 400;
  font-size: 15px;
  color: ${({ theme }) => theme.COLORS.ACCENT.BACKGROUND.PRIMARY};
`;

const $CancelButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -3px;
  top: -3px;
  width: 15px;
  height: 15px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
`;

export { $ListItemContainer, $SaleButtonContainer, $CurrentCategory, $CancelButton };
