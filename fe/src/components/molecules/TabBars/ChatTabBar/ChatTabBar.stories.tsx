import ChatTabBar from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/ChatTabBar',
  component: ChatTabBar,
} satisfies Meta<typeof ChatTabBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
