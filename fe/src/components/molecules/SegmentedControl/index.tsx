import React from 'react';

import SegmentedButton from '@molecules/SegmentedControl/SegmentedButton';
import { $SegmentedControl, $SegmentedSelected } from './SegmentedControl.style';

interface SegmentedControlProps {
  children: React.ReactNode;
}

export const SegmentContext = React.createContext({
  selectedIndex: 0,
  handleSelectedIndex: (index: number) => {
    return;
  },
});

const SegmentedControl = ({ children }: SegmentedControlProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleSelectedIndex = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <SegmentContext.Provider value={{ selectedIndex, handleSelectedIndex }}>
      <$SegmentedControl>
        <>
          {children}
          <$SegmentedSelected selectedIndex={selectedIndex} />
        </>
      </$SegmentedControl>
    </SegmentContext.Provider>
  );
};

SegmentedControl.SegmentedButton = SegmentedButton;

export default SegmentedControl;
