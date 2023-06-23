import type { Meta, StoryObj } from '@storybook/react';

import Skeleton from '.';

const meta = {
  title: 'Molecules/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: {},
};
