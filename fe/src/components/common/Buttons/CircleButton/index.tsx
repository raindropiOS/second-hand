import React from 'react';

import { $CircleButton, CircleButtonSize } from './CircleButton.style';
import Icon from '@common/Icon';
import { IconComponents } from '@common/Icon/IconComponents';

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
