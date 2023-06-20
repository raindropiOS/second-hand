import React from 'react';

import { $TownSettingMainText } from './TownSettingMain.style';

const TownSettingMain = () => {
  return (
    <div>
      <$TownSettingMainText>
        <span>지역은 최소 1개,</span>
        <span>최대 2개까지 설정 가능해요.</span>
      </$TownSettingMainText>
    </div>
  );
};

export default TownSettingMain;
