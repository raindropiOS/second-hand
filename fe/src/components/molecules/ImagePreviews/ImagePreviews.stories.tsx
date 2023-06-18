import type { Meta, StoryObj } from '@storybook/react';

import ImagePreviews from '.';

const meta = {
  title: 'Molecules/ImagePreviews',
  component: ImagePreviews,
} satisfies Meta<typeof ImagePreviews>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: {},

  argTypes: {},
};
