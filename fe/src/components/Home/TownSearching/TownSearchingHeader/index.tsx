import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PATH from '@constants/routerPath';

import Icon from '@atoms/Icon';
import Button from '@atoms/Buttons/Button';
import Navbar from '@molecules/Navbar';
import { $CenterEmptyBox, $RightEmptyBox } from './TownSearchingHeader.style';
import DialogPortal from '@components/portals/DialogPortal';
import Dialog from '@molecules/Dialog';

// FIXME(jayden): towns 타입(TOWN) import해서 사용하기
interface TownSearchingHeaderProps {
  selectedTowns: { townId: number; name: string }[];
}

const TownSearchingHeader = ({ selectedTowns }: TownSearchingHeaderProps) => {
  const navigate = useNavigate();
  const [isAlertShown, setIsAlertShown] = useState(false);

  const handleBackButtonClick = () => {
    if (selectedTowns.length === 0) {
      setIsAlertShown(true);
      return;
    }
    navigate(PATH.HOME.TOWN_SETTING, { state: { towns: selectedTowns } });
  };

  return (
    <Navbar>
      <Button onClick={handleBackButtonClick} status="ghost">
        <Icon name="chevronLeft" />
        <span>뒤로</span>
      </Button>
      <$CenterEmptyBox />
      <$RightEmptyBox />
      {isAlertShown && (
        <DialogPortal>
          <Dialog message={'최소 1개의 동네를 설정해주세요.'}>
            <Dialog.Button
              title="확인"
              onClick={() => {
                setIsAlertShown(false);
              }}
            />
          </Dialog>
        </DialogPortal>
      )}
    </Navbar>
  );
};

export default TownSearchingHeader;
