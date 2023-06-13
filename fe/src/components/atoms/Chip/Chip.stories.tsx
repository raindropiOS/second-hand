import type { Meta, StoryObj } from '@storybook/react';

import Chip from '.';

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    content: '전체',
    active: false,
  },

  argTypes: {},
};

export const Secondary: Story = {
  args: {
    content: '가구/인테리어',
    active: true,
  },

  argTypes: {},
};
