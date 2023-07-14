import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';

import Button from '@atoms/Buttons/Button';
import Icon from '@atoms/Icon';
import PATH from '@constants/routerPath';
import { $FooterContainer, $ButtonContainer, $Button, $FooterName, $TownSettingInfo } from './TownSettingFooter.style';
import DialogPortal from '@components/portals/DialogPortal';
import Dialog from '@molecules/Dialog';

interface TownSettingFooterProps {
  towns: { id: number; name: string }[];
}
const TownSettingFooter = ({ towns }: TownSettingFooterProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedTowns, setSelectedTowns] = useState(towns);
  const [selectedTownId, setSelectedTownId] = useState<number>();
  const [isDialogShown, setIsDialogShown] = useState(false);

  const handleTownButtonClick = (id: number) => {
    // TODO(jayden): 추후 모달창 직접 만들어서 띄우기
    if (selectedTowns.length === 1) {
      alert('최소 1개의 동네를 설정해주세요.');
      return;
    }
    // TODO(jayden): 추후 모달창 직접 만들어서 띄우기
    // FIXME(jayden): 로직 깔끔하게 정리하기
    if (confirm(`'${towns.find(town => town.id === id)?.name.split(' ')[2]}'을 삭제하시겠어요?`)) {
      setSelectedTowns(towns.filter(town => town.id !== id));
    }
    // TODO(jayden): 해당 id의 town DELETE 요청 추가
  };

  return (
    <$FooterContainer>
      <$FooterName>내 동네</$FooterName>

      <$ButtonContainer>
        {selectedTowns.map(town => (
          <$Button key={town.id} onClick={() => handleTownButtonClick(town.id)} size="large" status="active">
            {town.name.split(' ')[2]}
            <Icon name="cancel" fill={theme.COLORS.NEUTRAL.BACKGROUND.DEFAULT} />
          </$Button>
        ))}
        {selectedTowns.length === 1 && (
          <$Button
            onClick={() => navigate(PATH.HOME.TOWN_SEARCH, { state: { towns: selectedTowns } })}
            size="large"
            status="default"
          >
            동네 추가
            <Icon name="plus" fill={theme.COLORS.NEUTRAL.TEXT.STRONG} />
          </$Button>
        )}
      </$ButtonContainer>
      <$TownSettingInfo>※ 지역은 최소 1개, 최대 2개까지 설정 가능해요.</$TownSettingInfo>
    </$FooterContainer>
  );
};

export default TownSettingFooter;
