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
    height: calc(100vh - 133px);
    padding: 0 16px;
    overflow: auto;
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
