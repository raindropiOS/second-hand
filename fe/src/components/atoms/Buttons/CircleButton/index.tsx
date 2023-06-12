import React from 'react';

import { $CircleButton, CircleButtonSize } from './CircleButton.style';
import Icon from '@components/atoms/Icon';
import { IconComponents } from '@components/atoms/Icon/IconComponents';

interface CircleButtonProps {
  onClick: () => void;
  size: CircleButtonSize;
  iconName: keyof typeof IconComponents;
}

const CircleButton = ({ onClick, size = 'small', iconName }: CircleButtonProps) => {
  return (
    <$CircleButton size={size} onClick={onClick}>
      <Icon name={iconName} />
    </$CircleButton>
  );
};

export default CircleButton;
