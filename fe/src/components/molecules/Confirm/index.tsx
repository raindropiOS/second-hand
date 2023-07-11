import React, { useState } from 'react';

import { $ConfirmContainer, $ConfirmDimmer } from '@molecules/Confirm/Confirm.style';

interface ConfirmProps {
  message: string;
}

const Confirm = ({ message }: ConfirmProps) => {
  return (
    <$ConfirmContainer>
      <$ConfirmDimmer />
      {message}
    </$ConfirmContainer>
  );
};

export default Confirm;
