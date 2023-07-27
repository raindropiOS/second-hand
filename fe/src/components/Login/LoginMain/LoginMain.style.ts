import styled from 'styled-components';

const $LoginMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const $ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  width: 110px;
  height: 110px;
  border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
  border-radius: 50%;
`;

const $LoginButtonWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 144px;
`;

const $LoginButton = styled.button<{ color: string; backgroundColor: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 32px;
  gap: 12px;
  width: 304px;
  height: 56px;
  background: ${props => props.backgroundColor};
  border-radius: 10px;

  font-weight: 700;
  font-size: 20px;
  color: ${props => props.color};
`;

export { $LoginMain, $LoginButtonWrapper, $LoginButton, $ProfileImage };
