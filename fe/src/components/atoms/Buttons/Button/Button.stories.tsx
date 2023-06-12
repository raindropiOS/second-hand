import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';
import Icon from '@components/atoms/Icon';
import { theme } from '@styles/theme';

const meta = {
  title: 'Common/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: {
    children: '대화 중인 채팅방',
    size: 'small',
    status: 'active',
    justifyContent: 'center',
  },
  argTypes: {
    onClick: { action: 'onClick' },
  },
};

export const Second: Story = {
  args: {
    children: (
      <>
        <p>역삼1동</p>
        <Icon name="cancel" width={15} height={15} fill={theme.COLORS.ACCENT.TEXT.DEFAULT} />
      </>
    ),
    size: 'medium',
    status: 'active',
    justifyContent: 'between',
  },
  argTypes: {
    onClick: { action: 'onClick' },
  },
};

export const Third: Story = {
  args: {
    children: '로그인',
    size: 'large',
    status: 'active',
    justifyContent: 'center',
  },
  argTypes: {
    onClick: { action: 'onClick' },
  },
};
