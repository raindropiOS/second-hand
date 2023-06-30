import DetailTabBar from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/DetailTabBar',
  component: DetailTabBar,
} satisfies Meta<typeof DetailTabBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    productId: '1',
    isLiked: false,
    price: 169000,
  },
};
