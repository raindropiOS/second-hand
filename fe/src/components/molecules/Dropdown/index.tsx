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
  onSettingButtonClick: () => void;
}

const MY_TOWN_SETTING_WORD = '내 동네 설정하기';

// TODO(jayden): 각 드롭다운 버튼에 onClick 주입하여 데이터 fetch하도록 구현
// TODO(jayden): 드롭다운 컴포넌트도 compound pattern으로 구현해보기
const Dropdown = ({ towns, onSettingButtonClick }: DropdownProps) => {
  const [selectedTown, setSelectedTown] = React.useState(towns[0]);
  const [isDropdownOpen, setIsDropdownOpen, ref] = useOutsideClick(false);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleSelectTown = (townId: number) => {
    // FIXME(jayden): type assertion 제거
    setSelectedTown(towns.find(town => town.townId === townId) as Town);
    setIsDropdownOpen(false);
  };

  const handleTownSettingClick = () => {
    onSettingButtonClick();
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
              </>
            );
          })}
          <$SettingTownButton
            onClick={() => {
              handleDropdown();
              handleTownSettingClick();
            }}
          >
            {MY_TOWN_SETTING_WORD}
          </$SettingTownButton>
        </$DropdownLayout>
      )}
    </$DropdownContainer>
  );
};

export default Dropdown;
