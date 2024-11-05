import type { Meta, StoryObj } from '@storybook/react';

import ButtonChips from '../../components/atoms/ButtonChips';

const meta = {
  title: 'Atoms/ButtonChips',
  component: ButtonChips,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonChips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithField: Story = {
  args: {
    label: 'Button Chips',
    field: {
      value: {
        href: 'https://www.google.com',
      },
    },
  },
};

export const WithUrl: Story = {
  args: {
    label: 'Button Chips',
    url: 'https://www.google.com',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Button Chips',
    disabled: true,
  },
};
