import React from 'react';
import styled from 'styled-components';

interface $NavbarLayoutProps {
  children: React.ReactNode;
}

const $NavbarLayout = styled.header<$NavbarLayoutProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ children }) => (React.Children.count(children) === 1 ? 'center' : 'space-between')};
  align-items: center;

  width: 395px;
  height: 50px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL.BORDER.DEFAULT};

  font-weight: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_WEIGHT};
  font-size: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.FONT_SIZE};
  line-height: ${({ theme }) => theme.FONT_TOKEN.HEADLINE.LINE_HEIGHT};
`;

export { $NavbarLayout };
