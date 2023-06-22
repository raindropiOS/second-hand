import styled from 'styled-components';

const $LikeHeaderLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const $CurrentCategory = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 10px;
  padding-bottom: 15px;
  width: 100%;
  min-height: 80px;
  gap: 8px;
  font-weight: 400;
  font-size: 15px;
  color: ${({ theme }) => theme.COLORS.ACCENT.BACKGROUND.PRIMARY};
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export { $LikeHeaderLayout, $CurrentCategory };
