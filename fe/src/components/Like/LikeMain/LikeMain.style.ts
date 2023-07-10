import styled from 'styled-components';

const $LikeItemLayout = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: -60px;
  padding-bottom: 100px;
  max-height: 76vh;
`;

const $ProductLists = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

export { $LikeItemLayout, $ProductLists };
