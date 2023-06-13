import React from 'react';

import { $Chip } from './Chip.style';

interface ChipProps {
  content: string;
  active: boolean;
}

const Chip = ({ content, active }: ChipProps) => {
  return <$Chip active={active}>{content}</$Chip>;
};

export default Chip;
