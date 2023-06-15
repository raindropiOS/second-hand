import styled from 'styled-components';

const $DetailTabBar = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: flex-start;
  padding: 0px 25px;
  /* TODO(hoonding): width 100%로 바꾸기. */
  width: 100%;
  height: 83px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL.BACKGROUND.WEAK};
`;

const $LikeLayout = styled.button`
  display: flex;
  align-items: center;
  height: max-content;
  font-size: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_SIZE};
  font-weight: ${({ theme }) => theme.FONT_TOKEN.FOOTNOTE.FONT_WEIGHT};
  color: ${({ theme }) => theme.COLORS.NEUTRAL.TEXT.STRONG};
  gap: 10px;
`;

const $ChatButton = styled.button``;

export { $DetailTabBar, $LikeLayout, $ChatButton };
