import styled from 'styled-components';

const $SalesHistoryHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const $SegmentedControlContainer = styled.section`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 768px;
  top: 60px;

  z-index: 9999;
`;

export { $SalesHistoryHeaderContainer, $SegmentedControlContainer };
