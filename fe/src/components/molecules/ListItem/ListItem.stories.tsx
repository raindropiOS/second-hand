import type { Meta, StoryObj } from '@storybook/react';

import ListItem from '.';

const meta = {
  title: 'Molecules/ListItem',
  component: ListItem,
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: {
    productId: 1,
    title: '파랑 선풍기',
    town: { townId: 1, name: '역삼1동' },
    createdAt: '2023-06-05T00:00:00.000Z',
    status: 0,
    price: '24,500원',
    countInfo: { chatCount: 2, likeCount: 5 },
    imgUrl: 'https://via.placeholder.com/150',
    isCurrentUserItem: false,
  },
  // NOTE(Jayden): onClick같은 경우는 argsType을 사용해야 test시에도 사용할 수 있다.
  argTypes: {
    onItemClick: { action: 'onItemClick' },
    onItemMoreClick: { action: 'onItemMoreClick' },
  },
};

export const Second: Story = {
  args: {
    productId: 2,
    title: '잎사귀 포스터',
    town: { townId: 2, name: '강남3동' },
    createdAt: '2022-06-05T00:00:00.000Z',
    status: 1,
    price: '59,000원',
    countInfo: { chatCount: 0, likeCount: 2 },
    imgUrl: 'https://via.placeholder.com/150',
    isCurrentUserItem: true,
  },
  argTypes: {
    onItemClick: { action: 'onItemClick' },
    onItemMoreClick: { action: 'onItemMoreClick' },
  },
};

export const Third: Story = {
  args: {
    productId: 3,
    title: '회전 의자',
    town: { townId: 1, name: '역삼1동' },
    createdAt: '2023-06-11T06:00:00.000Z',
    status: 0,
    countInfo: { chatCount: 13, likeCount: 21 },
    imgUrl: 'https://via.placeholder.com/150',
    isCurrentUserItem: true,
  },
  argTypes: {
    onItemClick: { action: 'onItemClick' },
    onItemMoreClick: { action: 'onItemMoreClick' },
  },
};
