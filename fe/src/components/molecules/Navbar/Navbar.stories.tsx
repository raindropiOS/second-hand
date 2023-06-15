import type { Meta, StoryObj } from '@storybook/react';

import Navbar from '.';
import Button from '@atoms/Buttons/Button';
import Icon from '@atoms/Icon';

const meta = {
  title: 'Molecules/Navbar',
  component: Navbar,
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: {
    children: '동네 설정',
  },
};

export const Second: Story = {
  args: {
    children: (
      // NOTE(jayden): Navbar의 children count 로직때문에 Navbar를 children으로 전달하여 테스트
      <Navbar>
        <Button onClick={() => console.log('second-test')} status="ghost">
          <Icon name="chevronLeft" width={15} height={15} />
          <span>뒤로</span>
        </Button>
        <Icon name="more" width={15} height={15} />
      </Navbar>
    ),
  },
};

export const Third: Story = {
  args: {
    children: (
      // NOTE(jayden): Navbar의 children count 로직때문에 Navbar를 children으로 전달하여 테스트
      <Navbar>
        <Button onClick={() => console.log('second-test')} status="ghost">
          <Icon name="chevronLeft" width={15} height={15} />
          <span>뒤로</span>
        </Button>
        <span>내 물건 팔기</span>
        <Icon name="more" width={15} height={15} />
      </Navbar>
    ),
  },
};
