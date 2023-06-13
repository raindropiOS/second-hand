import React from 'react';
import { useTheme } from 'styled-components';

import Icon from '@atoms/Icon';
import { $ImageInputLabel, $ImageInputCount, $ImageInput } from './ImageInput.style';

const MAX_IMAGE_COUNT = 10;

interface ImageInputProps {
  count: number;
}

const ImageInput = ({ count = 0 }: ImageInputProps) => {
  const theme = useTheme();

  return (
    <>
      <$ImageInputLabel htmlFor="image_input">
        <Icon name="camera" width={35} height={29} fill={theme.COLORS.NEUTRAL.TEXT.STRONG} />
        <$ImageInputCount>
          {count}/{MAX_IMAGE_COUNT}
        </$ImageInputCount>
      </$ImageInputLabel>
      <$ImageInput id="image_input" type="file" accept="image/jpg, image/jpeg, image/png" />
    </>
  );
};

export default ImageInput;
