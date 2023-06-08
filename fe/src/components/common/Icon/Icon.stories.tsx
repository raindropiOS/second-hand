import Icon from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Common/Icon',
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: 'account',
    width: 22,
    height: 22,
    fill: '#000000',
  },
};
