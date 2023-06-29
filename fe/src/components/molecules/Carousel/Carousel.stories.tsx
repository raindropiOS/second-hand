import type { Meta, StoryObj } from '@storybook/react';

import Carousel from '.';

const meta = {
  title: 'Molecules/Carousel',
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: {
    children: [
      <Carousel.Slide key={1}>
        <img src="https://via.placeholder.com/100x100" alt="carousel" />
      </Carousel.Slide>,
      <Carousel.Slide key={2}>
        <img
          src="https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="carousel"
        />
      </Carousel.Slide>,
      <Carousel.Slide key={3}>
        <img src="https://via.placeholder.com/300x300" alt="carousel" />
      </Carousel.Slide>,
    ],
  },

  argTypes: {},
};
