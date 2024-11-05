import type { Meta, StoryObj } from '@storybook/react';

import DropdownMenu from '../../components/atoms/DropdownMenu';

const meta = {
  title: 'Atoms/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      { id: 1, label: 'Tab 1' },
      { id: 2, label: 'Tab 2' },
    ],
    currentTab: 0,
    onTabChange: () => {
      console.log('Tab changed');
    },
  },
};
