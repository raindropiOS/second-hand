import styled from 'styled-components';

const $LoginMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const $ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 110px;
  height: 110px;
  border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
  border-radius: 50%;
`;

const $LoginButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 32px;
  gap: 12px;

  width: 304px;
  height: 56px;
  background: #000000;
  border-radius: 10px;

  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
`;

export { $LoginMain, $LoginButton, $ProfileImage };
