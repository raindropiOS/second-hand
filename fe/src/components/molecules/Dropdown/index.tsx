import React from 'react';

import Icon from '@atoms/Icon';
import {
  $DropdownContainer,
  $DropdownButton,
  $DropdownLayout,
  $MyTownButton,
  $SettingTownButton,
} from './Dropdown.style';
import useOutsideClick from '@hooks/useOutsideClick';

type Town = {
  townId: number;
  name: string;
};

interface DropdownProps {
  towns: Town[];
}

const MY_TOWN_SETTING_WORD = '내 동네 설정하기';

// TODO(jayden): 각 드롭다운 버튼에 onClick 주입하여 데이터 fetch하도록 구현
const Dropdown = ({ towns }: DropdownProps) => {
  const [selectedTown, setSelectedTown] = React.useState(towns[0]);
  const [isDropdownOpen, setIsDropdownOpen, ref] = useOutsideClick(false);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleSelectTown = (townId: number) => {
    setSelectedTown(towns.find(town => town.townId === townId) as Town);
    setIsDropdownOpen(false);
  };

  // TODO(jayden): '버튼'에 해당하는 컴포넌트들 Button 컴포넌트로 대체
  return (
    <$DropdownContainer ref={ref}>
      <$DropdownButton onClick={handleDropdown}>
        {selectedTown.name.split(' ')[2]}
        <Icon name="chevronDown" />
      </$DropdownButton>
      {isDropdownOpen && (
        <$DropdownLayout>
          {towns.map(({ townId, name }, index, arr) => {
            return (
              <>
                <$MyTownButton key={townId} onClick={() => handleSelectTown(townId)}>
                  {name.split(' ')[2]}
                </$MyTownButton>
                {index === arr.length - 1 && (
                  <$SettingTownButton onClick={handleDropdown}>{MY_TOWN_SETTING_WORD}</$SettingTownButton>
                )}
              </>
            );
          })}
        </$DropdownLayout>
      )}
    </$DropdownContainer>
  );
};

export default Dropdown;
