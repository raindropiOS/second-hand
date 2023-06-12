import DetailTabBar from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Common/DetailTabBar',
  component: DetailTabBar,
} satisfies Meta<typeof DetailTabBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    price: '169000',
  },
};
