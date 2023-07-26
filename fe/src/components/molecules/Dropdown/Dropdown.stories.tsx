import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from '.';

const meta = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: {
    towns: [
      {
        townId: 5,
        name: '서울 강남구 삼성1동',
      },
      {
        townId: 14,
        name: '서울 강남구 역삼3동',
      },
    ],
  },

  argTypes: {},
};
