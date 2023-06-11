import ChatTabBar from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Common/ChatTabBar',
  component: ChatTabBar,
} satisfies Meta<typeof ChatTabBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
