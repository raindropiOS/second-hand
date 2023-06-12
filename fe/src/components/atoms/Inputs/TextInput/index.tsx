import React from 'react';

import { $TextInput, TextInputCategory } from './TextInput.style';

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  width?: number;
  category?: TextInputCategory;
  placeholder?: string;
}

const TextInput = ({ value, onChange, onKeyDown, width = 325, category = 'default', placeholder }: TextInputProps) => {
  return (
    <$TextInput
      type="text"
      category={category}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      width={width}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
