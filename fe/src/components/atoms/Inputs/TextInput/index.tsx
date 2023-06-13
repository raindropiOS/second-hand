import React from 'react';
import { useTheme } from 'styled-components';

import { $TextInputLayout, $TextInput, TextInputCategory } from './TextInput.style';
import Icon from '@atoms/Icon';

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  width?: number;
  category?: TextInputCategory;
  placeholder?: string;
}

const TextInput = ({ value, onChange, onKeyDown, width = 325, category = 'default', placeholder }: TextInputProps) => {
  const theme = useTheme();

  return (
    <$TextInputLayout width={width} category={category}>
      {category === 'search' && <Icon name="search" fill={theme.COLORS.NEUTRAL.TEXT.WEAK} />}
      <$TextInput type="text" value={value} onChange={onChange} onKeyDown={onKeyDown} placeholder={placeholder} />
    </$TextInputLayout>
  );
};

export default TextInput;
