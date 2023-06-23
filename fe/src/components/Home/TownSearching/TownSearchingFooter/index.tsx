import React, { useEffect } from 'react';

import { $TownItem } from './TownSearchingFooter.style';
import Icon from '@atoms/Icon';

interface Town {
  townId: number;
  name: string;
}

interface TownSearchingFooterProps {
  totalTowns: Town[];
  inputTownName: string;
  selectedTowns: Town[];
  onItemClick: (townId: number) => void;
}

const TownSearchingFooter = ({ totalTowns, inputTownName, selectedTowns, onItemClick }: TownSearchingFooterProps) => {
  // TODO(jayden): TownItem 클릭 시, 해당 타운 POST API 호출 및 성공 시, onItemClick 실행
  return (
    <>
      {totalTowns.map(
        town =>
          town.name.includes(inputTownName) && (
            <$TownItem
              key={town.townId}
              onClick={() => {
                onItemClick(town.townId);
              }}
            >
              {town.name}
              {selectedTowns.map(town => town.townId).includes(town.townId) && <Icon name="checkmark" />}
            </$TownItem>
          )
      )}
    </>
  );
};

export default TownSearchingFooter;
