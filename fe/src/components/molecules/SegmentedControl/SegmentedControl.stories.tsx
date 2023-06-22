import type { Meta, StoryObj } from '@storybook/react';

import SegmentedControl from '@molecules/SegmentedControl/index';

const meta = {
  title: 'Molecules/SegmentedControl',
  component: SegmentedControl,
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: {
    children: (
      <>
        <SegmentedControl.SegmentedButton onClick={() => console.log('first-test')} segmentedIndex={0}>
          1번
        </SegmentedControl.SegmentedButton>
        <SegmentedControl.SegmentedButton onClick={() => console.log('second-test')} segmentedIndex={1}>
          2번
        </SegmentedControl.SegmentedButton>
      </>
    ),
  },
};

export const Secondary: Story = {
  args: {
    children: (
      <>
        <SegmentedControl.SegmentedButton onClick={() => console.log('first-test')} segmentedIndex={0}>
          1번
        </SegmentedControl.SegmentedButton>
        <SegmentedControl.SegmentedButton onClick={() => console.log('second-test')} segmentedIndex={1}>
          2번
        </SegmentedControl.SegmentedButton>
        <SegmentedControl.SegmentedButton onClick={() => console.log('first-test')} segmentedIndex={2}>
          3번
        </SegmentedControl.SegmentedButton>
      </>
    ),
  },
};
