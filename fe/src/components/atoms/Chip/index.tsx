import React from 'react';

import { $Chip } from './Chip.style';

interface ChipProps {
  content: string;
  active: boolean;
  onClick?: () => void;
}

const Chip = ({ content, active, onClick }: ChipProps) => {
  return (
    <$Chip active={active} onClick={onClick}>
      {content}
    </$Chip>
  );
};

export default Chip;
