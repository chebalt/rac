import type { Meta, StoryObj } from '@storybook/react';

import ContentSwitcher from '../../components/atoms/ContentSwitcher';

const meta = {
  title: 'Atoms/ContentSwitcher',
  component: ContentSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContentSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      { id: 1, label: { value: 'Tab 1' } },
      { id: 2, label: { value: 'Tab 2' } },
    ],
    currentTab: 0,
    onTabChange: () => {
      console.log('Tab changed');
    },
  },
};
