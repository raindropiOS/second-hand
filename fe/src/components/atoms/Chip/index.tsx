import React from 'react';

import { $Chip } from './Chip.style';

interface ChipProps {
  content: string;
  active: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Chip = ({ content, active, onClick, children }: ChipProps) => {
  return (
    <$Chip active={active} onClick={onClick}>
      {content}
      {children}
    </$Chip>
  );
};

export default Chip;
