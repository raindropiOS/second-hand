import type { Meta, StoryObj } from '@storybook/react';

import TextInput from '.';
import React from 'react';
import { TextInputCategory } from '@atoms/Inputs/TextInput/TextInput.style';

const meta = {
  title: 'Common/TextInput',
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: {
    value: '',
    width: 160,
    category: 'default',
    placeholder: '아이디를 입력하세요',
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export const Second: Story = {
  args: {
    value: '',
    placeholder: '글제목',
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export const Third: Story = {
  args: {
    value: '',
    width: 325,
    category: 'chat',
    placeholder: '내용을 입력하세요',
  },
  argTypes: {
    onChange: { action: 'onChange' },
    onKeyDown: { action: 'onKeyDown' },
  },
};

export const Fourth: Story = {
  args: {
    value: '',
    width: 325,
    category: 'search',
    placeholder: '동명(읍, 면)으로 검색(ex. 서초동)',
  },
  argTypes: {
    onChange: { action: 'onChange' },
    onKeyDown: { action: 'onKeyDown' },
  },
};
