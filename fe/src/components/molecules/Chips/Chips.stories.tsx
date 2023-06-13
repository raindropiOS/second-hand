import type { Meta, StoryObj } from '@storybook/react';

import Chips from '.';

const meta = {
  title: 'Molecules/Chips',
  component: Chips,
} satisfies Meta<typeof Chips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    categories: [
      { id: 1, category: '디지털기기' },
      { id: 2, category: '유아동' },
      { id: 3, category: '취미/게임/음반' },
    ],
  },

  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export const Secondary: Story = {
  args: {
    categories: [
      { id: 1, category: '남성패션/잡화' },
      { id: 2, category: '가공식품' },
      { id: 3, category: '기타 중고물품' },
    ],
  },

  argTypes: {
    onClick: { action: 'clicked' },
  },
};
