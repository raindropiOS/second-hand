import type { Meta, StoryObj } from '@storybook/react';

import StatusModal from '.';

const meta = {
  title: 'Molecules/StatusModal',
  component: StatusModal,
} satisfies Meta<typeof StatusModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    currentStatus: 1,
  },
};

export const Secondary: Story = {
  args: {
    currentStatus: 2,
  },
};
