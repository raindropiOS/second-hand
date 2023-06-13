import React from 'react';

import { $ChipLayout } from './Chip.style';

interface ChipProps {
  content: string;
  active: boolean;
}

const Chip = ({ content, active }: ChipProps) => {
  return <$ChipLayout active={active}>{content}</$ChipLayout>;
};

export default Chip;
