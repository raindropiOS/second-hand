import ListItem from '../ListItem';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Common/ListItem',
  component: ListItem,
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: {
    img: 'https://via.placeholder.com/150',
    title: '파랑 선풍기',
    town: '역삼1동',
    timestamp: '2시간 전',
    status: '판매중',
    price: '24,500',
    chatCount: 2,
    likeCount: 5,
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
    img: 'https://via.placeholder.com/150',
    title: '잎사귀 포스터',
    town: '역삼1동',
    timestamp: '7시간 전',
    status: '예약중',
    price: '59,000',
    chatCount: 0,
    likeCount: 2,
    isCurrentUserItem: true,
  },
  argTypes: {
    onItemClick: { action: 'onItemClick' },
    onItemMoreClick: { action: 'onItemMoreClick' },
  },
};

export const Third: Story = {
  args: {
    img: 'https://via.placeholder.com/150',
    title: '회전 의자',
    town: '역삼 1동',
    timestamp: '1일 전',
    status: '판매중',
    chatCount: 13,
    likeCount: 21,
    isCurrentUserItem: true,
  },
  argTypes: {
    onItemClick: { action: 'onItemClick' },
    onItemMoreClick: { action: 'onItemMoreClick' },
  },
};
