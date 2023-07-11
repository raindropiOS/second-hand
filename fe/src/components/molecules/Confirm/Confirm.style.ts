import styled from 'styled-components';

const $ConfirmContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const $ConfirmDimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export { $ConfirmContainer, $ConfirmDimmer };
