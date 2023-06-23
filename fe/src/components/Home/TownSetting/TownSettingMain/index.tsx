import React from 'react';

import useCurrentLocation from '@hooks/useCurrentLocation';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { $TownSettingMainText, $MapContainer } from './TownSettingMain.style';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};

const TownSettingMain = () => {
  const { location, error } = useCurrentLocation(geolocationOptions);

  return (
    <>
      {location && (
        <$TownSettingMainText>
          <$MapContainer>
            <Map
              center={{ lat: Number(`${location.latitude}`), lng: Number(`${location.longitude}`) }}
              style={{ width: '100%', height: '360px' }}
            >
              <MapMarker
                position={{ lat: Number(`${location.latitude}`), lng: Number(`${location.longitude}`) }}
                image={{
                  src: `${process.env.PUBLIC_URL}/assets/marker.png`,
                  size: {
                    width: 50,
                    height: 50,
                  },
                }}
              />
            </Map>
          </$MapContainer>
        </$TownSettingMainText>
      )}
    </>
  );
};

export default TownSettingMain;
