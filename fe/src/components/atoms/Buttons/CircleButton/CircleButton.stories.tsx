import type { Meta, StoryObj } from '@storybook/react';

import CircleButton from '.';

const meta = {
  title: 'Common/CircleButton',
  component: CircleButton,
} satisfies Meta<typeof CircleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: {
    size: 'small',
    iconName: 'arrowUp',
  },
  argTypes: {
    onClick: { action: 'onClick' },
  },
};

export const Second: Story = {
  args: {
    size: 'large',
    iconName: 'plus',
  },
  argTypes: {
    onClick: { action: 'onClick' },
  },
};
