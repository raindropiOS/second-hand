import React from 'react';
import { useLocation } from 'react-router-dom';

import TownSettingHeader from '@components/Home/TownSetting/TownSettingHeader';
import TownSettingMain from '@components/Home/TownSetting/TownSettingMain';
import TownSettingFooter from '@components/Home/TownSetting/TwonSettingFooter';

const TownSetting = () => {
  const { state } = useLocation();
  const { towns } = state;

  return (
    <>
      <TownSettingHeader />
      <TownSettingMain />
      <TownSettingFooter towns={towns} />
    </>
  );
};

export default TownSetting;
