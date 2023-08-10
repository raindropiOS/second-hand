import React, { useState } from 'react';

import axiosFetch from '@apis/instances/axiosFetch';

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

  const firstSelectedTownId = selectedTowns[0]?.townId;
  const [selectedTownIds, setSelectedTownIds] = useState([firstSelectedTownId]); // [1]

  const handleTownItemClick = async (townId: number) => {
    if (selectedTownIds.length === 0) {
      const response = await axiosFetch.patch('/towns', { townsId: [townId] });

      const { success } = await response.data;

      if (success) {
        onItemClick(townId);
        setSelectedTownIds(prev => [...prev, townId]);
      } else {
        throw new Error('동네를 변경하는데 실패했습니다!');
      }
    } else if (selectedTownIds.length === 1) {
      if (selectedTownIds[0] === townId) {
        setSelectedTownIds([]);
        onItemClick(townId);
        return;
      }

      const response = await axiosFetch.patch('/towns', { townsId: [...selectedTownIds, townId] });

      const { success } = await response.data;

      if (success) {
        onItemClick(townId);
        setSelectedTownIds(prev => [...prev, townId]);
      } else {
        throw new Error('동네를 변경하는데 실패했습니다!');
      }
    } else if (selectedTownIds.length === 2) {
      if (!selectedTownIds.includes(townId)) {
        return;
      }
      const response = await axiosFetch.patch('/towns', {
        townsId: selectedTownIds.slice(0, 1),
      });

      const { success } = await response.data;

      if (success) {
        onItemClick(townId);
        setSelectedTownIds(prev => prev.slice(0, 1));
      } else {
        throw new Error('동네를 변경하는데 실패했습니다!');
      }
    }
  };

  return (
    <>
      {totalTowns.map(
        town =>
          town.name.includes(inputTownName) && (
            <$TownItem
              key={town.townId}
              onClick={() => {
                handleTownItemClick(town.townId);
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
