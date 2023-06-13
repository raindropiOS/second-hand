import styled from 'styled-components';

const $LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 800px;
`;

const $LoginHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  font-size: ${({ theme }) => theme.FONT_TOKEN.BODY.FONT_SIZE};
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};
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

export { $LoginLayout, $LoginHeader, $LoginButton, $ProfileImage };
