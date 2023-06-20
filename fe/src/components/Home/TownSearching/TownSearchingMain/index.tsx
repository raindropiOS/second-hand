import React from 'react';

import TextInput from '@atoms/Inputs/TextInput';

const TOWN_SEARCHING_PLACEHOLDER = '동명(읍,면) 으로 검색 (ex. 역삼1동)';

interface TownSearchingMainProps {
  inputTownName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TownSearchingMain = ({ inputTownName, onChange }: TownSearchingMainProps) => {
  return (
    <TextInput value={inputTownName} onChange={onChange} category="search" placeholder={TOWN_SEARCHING_PLACEHOLDER} />
  );
};

export default TownSearchingMain;
