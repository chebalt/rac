import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Checkbox from '../../components/atoms/Checkbox';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Checkbox',
    id: 'checkbox-1',
    name: 'checkbox-1',
    value: 'checkbox-1',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Checkbox',
    checked: true,
    id: 'checkbox-2',
    name: 'checkbox-2',
    value: 'checkbox-2',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Checkbox',
    disabled: true,
    id: 'checkbox-3',
    name: 'checkbox-3',
    value: 'checkbox-3',
    checked: false,
  },
};
