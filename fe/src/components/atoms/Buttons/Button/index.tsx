import React from 'react';

import { $Button, ButtonSize, ButtonStatus, ButtonJustifyContent } from './Button.style';

type ButtonProps = {
  children: React.ReactNode;
  onClick: (() => void) | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  size?: ButtonSize;
  status?: ButtonStatus;
  justifyContent?: ButtonJustifyContent;
  className?: string;
  type?: 'submit' | 'button' | 'reset';
};

const Button = ({
  className = '',
  children,
  onClick,
  size = 'small',
  status = 'default',
  justifyContent = 'center',
  type = 'button',
}: ButtonProps) => {
  return (
    <$Button
      className={className}
      type={type}
      onClick={onClick}
      size={size}
      status={status}
      justifyContent={justifyContent}
    >
      {children}
    </$Button>
  );
};

export default Button;
