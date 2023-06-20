import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import TownSettingHeader from '@components/Home/TownSetting/TownSettingHeader';
import TownSettingMain from '@components/Home/TownSetting/TownSettingMain';
import TownSettingFooter from '@components/Home/TownSetting/TwonSettingFooter';

const TownSetting = () => {
  const location = useLocation();
  const data = location.state;
  const towns = data.towns;

  console.log(towns);
  return (
    <>
      <TownSettingHeader />
      <TownSettingMain />
      <TownSettingFooter towns={towns} />
    </>
  );
};

export default TownSetting;
