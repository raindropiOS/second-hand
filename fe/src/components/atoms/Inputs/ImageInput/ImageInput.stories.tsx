import type { Meta, StoryObj } from '@storybook/react';

import ImageInput from '.';

const meta = {
  title: 'Atoms/ImageInput',
  component: ImageInput,
} satisfies Meta<typeof ImageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: {
    count: 2,
  },
};

export const Second: Story = {
  args: {
    count: 10,
  },
};
