import styled, { css } from 'styled-components';

const PageTemplateStyle = {
  header: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 768px;
    opacity: 0.9;
    backdrop-filter: blur(30px);
    z-index: 9999;
  `,
  main: css`
    position: relative;
    top: 50px;
    max-width: 768px;
    width: 100%;
    height: calc(100vh - 133px);
    padding: 0 16px;
    overflow: auto;
    &:hover {
      &::-webkit-scrollbar-thumb {
        visibility: visible;
      }
    }
    &::-webkit-scrollbar {
      width: 8px; /* 스크롤바의 너비 */
    }

    &::-webkit-scrollbar-thumb {
      height: 5%; /* 스크롤바의 길이 */
      background: ${({ theme }) => theme.COLORS.ACCENT.BACKGROUND.PRIMARY}; /* 스크롤바의 색상 */
      visibility: hidden;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 149, 0, 0.1);
    }
  `,

  footer: css`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    max-width: 768px;
    z-index: 9999;
  `,
};

const $Template = styled.div`
  & > header {
    ${PageTemplateStyle.header}
  }
  & > main {
    ${PageTemplateStyle.main}
  }
  & > footer {
    ${PageTemplateStyle.footer}
  }
`;

export { $Template };
