import React, { useEffect, useState } from 'react';
import useCurrentLocation from './useCurrentLocation';

import { KAKAO } from '@constants/API';
import kakaoFetch from 'src/apis/instances/kakaoFetch';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};

const useCurrentRegion = () => {
  // loading 처리도 해야함.
  const { location, error } = useCurrentLocation(geolocationOptions);
  const [region, setRegion] = useState('');

  useEffect(() => {
    if (location.latitude === 0) return;
    const getCurrentTown = async (latitude: number, longitude: number) => {
      const { data } = await kakaoFetch.get(KAKAO.GET_CURRENT_LOCATION(latitude, longitude));
      const address = data.documents[0].address;

      setRegion(`${address.region_1depth_name} ${address.region_2depth_name} ${address.region_3depth_name}`);
    };

    getCurrentTown(location.latitude, location.longitude);
  }, [location]);

  return { region, error };
};

export default useCurrentRegion;
