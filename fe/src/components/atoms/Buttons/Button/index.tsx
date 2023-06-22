import React from 'react';

import { $Button, ButtonSize, ButtonStatus, ButtonJustifyContent } from './Button.style';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  size?: ButtonSize;
  status?: ButtonStatus;
  justifyContent?: ButtonJustifyContent;
  className?: string;
};

const Button = ({
  className = '',
  children,
  onClick,
  size = 'small',
  status = 'default',
  justifyContent = 'center',
}: ButtonProps) => {
  return (
    <$Button className={className} onClick={onClick} size={size} status={status} justifyContent={justifyContent}>
      {children}
    </$Button>
  );
};

export default Button;
