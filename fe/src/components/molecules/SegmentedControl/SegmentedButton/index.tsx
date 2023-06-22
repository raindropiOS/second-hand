import React, { useContext } from 'react';

import { $SegmentedButton } from './SegmentedButton.style';
import { SegmentContext } from '@molecules/SegmentedControl';

interface SegmentedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  segmentedIndex: number;
}

const SegmentedButton = ({ children, onClick, segmentedIndex }: SegmentedButtonProps) => {
  const { handleSelectedIndex } = useContext(SegmentContext);

  return (
    <$SegmentedButton
      onClick={() => {
        onClick();
        handleSelectedIndex(segmentedIndex);
      }}
    >
      {children}
    </$SegmentedButton>
  );
};

export default SegmentedButton;
