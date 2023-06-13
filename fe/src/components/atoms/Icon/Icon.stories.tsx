import Icon from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Account: Story = {
  args: {
    name: 'account',
    width: 22,
    height: 22,
    fill: '#000000',
  },
};

export const Camera: Story = {
  args: {
    name: 'camera',
    width: 35,
    height: 35,
    fill: '#FF9500',
  },
};

export const Like: Story = {
  args: {
    name: 'like',
    width: 35,
    height: 35,
    fill: '#FF3B30',
  },
};
