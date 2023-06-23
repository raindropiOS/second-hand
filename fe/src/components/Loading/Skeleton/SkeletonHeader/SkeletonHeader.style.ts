import styled from 'styled-components';
const $HeaderLayout = styled.header`
  position: relative;
  display: flex;
  flex-direction: row;

  align-items: center;

  width: 100%;
  height: 50px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};

  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.DEFAULT};
`;

export { $HeaderLayout };
