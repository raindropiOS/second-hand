import styled from 'styled-components';

const $TownItem = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 50px;
  padding: 0 32px;

  font-weight: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.SUBHEAD.LINE_HEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.DEFAULT};
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};

  &:hover {
    background-color: rgba(255, 149, 0, 0.1);
  }
`;

export { $TownItem };
