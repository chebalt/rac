import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import ArrowButton from '../../components/atoms/ArrowButton';

const meta = {
  title: 'Atoms/ArrowButton',
  component: ArrowButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  args: { onClick: fn() },
} satisfies Meta<typeof ArrowButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'small',
    direction: 'right',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    direction: 'right',
  },
};
