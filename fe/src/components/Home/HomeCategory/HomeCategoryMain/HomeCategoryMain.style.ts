import styled, { css } from 'styled-components';

const currentBox = css`
  border: 2px solid ${({ theme }) => theme.COLORS.ACCENT.BACKGROUND.PRIMARY};
  border-radius: 14px;
  background-color: rgba(255, 149, 0, 0.2);
`;

const $HomeCategoryMain = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const $Category = styled.button<{ selected: boolean }>`
  ${({ selected }) => selected && currentBox}
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 14px;

  &:hover {
    background-color: rgba(255, 149, 0, 0.2);
  }
`;

const $CategoryImg = styled.img`
  width: 50px;
  height: 50px;
`;

const $CategoryTitle = styled.div`
  font-weight: 400;
  font-size: 15px;
`;

export { $HomeCategoryMain, $Category, $CategoryImg, $CategoryTitle };
