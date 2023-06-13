import SaleTabBar from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/SaleTabBar',
  component: SaleTabBar,
} satisfies Meta<typeof SaleTabBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    townNames: '역삼 1동',
  },
};
