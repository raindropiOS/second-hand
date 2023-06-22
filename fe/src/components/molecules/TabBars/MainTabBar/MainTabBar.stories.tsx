import MainTabBar from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/MainTabBar',
  component: MainTabBar,
} satisfies Meta<typeof MainTabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: {
    isClickedId: 0,
  },
};

export const Second: Story = {
  args: {
    isClickedId: 1,
  },
};
