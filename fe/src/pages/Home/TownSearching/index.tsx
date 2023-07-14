import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import TownSearchingHeader from '@components/Home/TownSearching/TownSearchingHeader';
import TownSearchingMain from '@components/Home/TownSearching/TownSearchingMain';
import TownSearchingFooter from '@components/Home/TownSearching/TownSearchingFooter';
import axiosFetch from '@apis/instances/axiosFetch';
import DialogPortal from '@components/portals/DialogPortal';
import Dialog from '@molecules/Dialog';

interface Town {
  townId: number;
  name: string;
}

const TownSearching = () => {
  const { state } = useLocation();
  const { towns } = state;
  const [selectedTowns, setSelectedTowns] = useState<Town[]>(towns);
  const [inputTownName, setInputTownName] = useState('');
  const [totalTowns, setTotalTowns] = useState<Town[]>([]);
  const [isAlertShown, setIsAlertShown] = useState(false);

  const handleInputTownNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTownName(e.target.value);
  };

  const handleMoreTownClick = () => {
    setIsAlertShown(true);
    return;
  };

  const handleSelectedTownsClick = (townId: number) => {
    // TODO(jayden): 타운 선택할 때, 해당 타운 POST API 호출 및 성공 시, setSelectedTowns 실행
    setSelectedTowns(prev => {
      // 이미 선택된 타운이면 선택 해제
      if (prev.map(town => town.townId).includes(townId)) return prev.filter(town => town.townId !== townId);
      // 선택된 타운이 2개 이상이면 선택 불가
      if (prev.length >= 2) {
        // NOTE(jayden): strict mode로 인해, alert가 처음만 두 번 실행됨
        handleMoreTownClick();
        return prev;
      }
      return [...prev, totalTowns.find(town => town.townId === townId)] as Town[];
    });
  };

  // 타운 전체 목록 가져오는 API 호출
  useEffect(() => {
    const getTotalTowns = async () => {
      const response = await axiosFetch('/towns', {
        method: 'GET',
      });
      const data = await response.data;
      const isSuccess = data.success;
      const towns = data.data;

      if (!isSuccess) throw new Error('Failed to fetch total towns');
      setTotalTowns(towns);
    };

    getTotalTowns();
  }, []);
  return totalTowns.length ? (
    <>
      <TownSearchingHeader selectedTowns={selectedTowns} />
      <TownSearchingMain inputTownName={inputTownName} onChange={handleInputTownNameChange} />
      <TownSearchingFooter
        totalTowns={totalTowns}
        inputTownName={inputTownName}
        selectedTowns={selectedTowns}
        onItemClick={handleSelectedTownsClick}
      />
      {isAlertShown && (
        <DialogPortal>
          <Dialog message={'최대 2개의 동네만 설정할 수 있어요!'}>
            <Dialog.Button
              title="확인"
              onClick={() => {
                setIsAlertShown(false);
              }}
            />
          </Dialog>
        </DialogPortal>
      )}
    </>
  ) : (
    <>로딩중</>
  );
};

export default TownSearching;
