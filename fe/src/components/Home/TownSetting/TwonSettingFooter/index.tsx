import React, { useState } from 'react';

import Button from '@atoms/Buttons/Button';
import { $ButtonContainer } from './TownSettingFooter.style';
import Icon from '@atoms/Icon';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface TownSettingFooterProps {
  towns: { townId: number; name: string }[];
}
const TownSettingFooter = ({ towns }: TownSettingFooterProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedTowns, setSeletedTowns] = useState(towns);

  const handleTownButtonClick = (id: number) => {
    // TODO(jayden): 추후 모달창 직접 만들어서 띄우기
    if (selectedTowns.length === 1) {
      alert('최소 1개의 도시가 설정되어야 합니다.');
      return;
    }
    // TODO(jayden): 추후 모달창 직접 만들어서 띄우기
    // FIXME(jayden): 로직 깔끔하게 정리하기
    if (confirm(`'${towns.find(town => town.townId === id)?.name.split(' ')[2]}'을 삭제하시겠어요?`)) {
      setSeletedTowns(towns.filter(town => town.townId !== id));
    }
    // TODO(jayden): 해당 id의 town DELETE 요청 추가
  };

  return (
    <$ButtonContainer>
      {selectedTowns.map(town => (
        <Button key={town.townId} onClick={() => handleTownButtonClick(town.townId)} size="large" status="active">
          {town.name.split(' ')[2]}
          <Icon name="cancel" fill={theme.COLORS.NEUTRAL.BACKGROUND.DEFAULT} />
        </Button>
      ))}
      {selectedTowns.length === 1 && (
        <Button onClick={() => navigate('/home/town-setting/search')} size="large" status="default">
          <Icon name="plus" fill={theme.COLORS.NEUTRAL.TEXT.STRONG} />
        </Button>
      )}
    </$ButtonContainer>
  );
};

export default TownSettingFooter;
