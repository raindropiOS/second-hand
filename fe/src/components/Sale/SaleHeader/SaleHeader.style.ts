import styled from 'styled-components';
import Button from '@atoms/Buttons/Button';

const $SubmitButton = styled(Button)<{ submit: boolean }>`
  cursor: ${({ submit }) => (submit ? 'pointer' : 'not-allowed')};
`;

export { $SubmitButton };
