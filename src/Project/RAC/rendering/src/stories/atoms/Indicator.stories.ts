import type { Meta, StoryObj } from '@storybook/react';

import Indicator from '../../components/atoms/Indicator';
import { fn } from '@storybook/test';

const meta = {
  title: 'Atoms/Indicator',
  component: Indicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Indicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default25percent: Story = {
  args: {
    id: 'indicator-1',
    progress: 25,
    isActive: true,
    onClick: fn(),
  },
};

export const Default50percent: Story = {
  args: {
    id: 'indicator-2',
    progress: 50,
    isActive: true,
    onClick: fn(),
  },
};

export const Default75percent: Story = {
  args: {
    id: 'indicator-3',
    progress: 75,
    isActive: true,
    onClick: fn(),
  },
};

export const Default100percent: Story = {
  args: {
    id: 'indicator-4',
    progress: 100,
    isActive: true,
    onClick: fn(),
  },
};

export const Inactive: Story = {
  args: {
    id: 'indicator-5',
    progress: 100,
    isActive: false,
    onClick: fn(),
  },
};
