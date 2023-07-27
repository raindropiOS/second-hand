import React from 'react';

import {
  $DialogContainer,
  $DialogDimmer,
  $DialogBoxWrapper,
  $DialogBoxHeader,
  $DialogBoxBody,
  $DialogBoxButton,
} from '@molecules/Dialog/Dialog.style';

interface DialogProps {
  message: string;
  children?: React.ReactNode;
}

interface DialogButtonProps {
  title: string;
  onClick: () => void;
}

const Dialog = ({ message, children }: DialogProps) => {
  return (
    <$DialogContainer>
      <$DialogDimmer />
      <$DialogBoxWrapper>
        <$DialogBoxHeader>{message}</$DialogBoxHeader>
        <$DialogBoxBody>{children}</$DialogBoxBody>
      </$DialogBoxWrapper>
    </$DialogContainer>
  );
};

const DialogButton = ({ title, onClick }: DialogButtonProps) => {
  return <$DialogBoxButton onClick={onClick}>{title}</$DialogBoxButton>;
};

Dialog.Button = DialogButton;

export default Dialog;
