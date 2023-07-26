import type { Meta, StoryObj } from '@storybook/react';

import Modal, { SALE_MODAL_MENUS, DETAIL_MODAL_MENUS } from '.';

const meta = {
  title: 'Molecules/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SaleModal: Story = {
  args: {
    onClickHandlers: [
      () => {
        console.log(1);
      },
    ],
    menus: SALE_MODAL_MENUS,
  },

  argTypes: {},
};

export const DetailModal: Story = {
  args: {
    onClickHandlers: [
      () => {
        console.log(1);
      },
    ],
    menus: DETAIL_MODAL_MENUS,
  },
  argTypes: {},
};
