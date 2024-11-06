import { Meta, StoryObj } from '@storybook/react';
import MultiSelectChips from '../../components/atoms/MultiSelectChips';
import { fn } from '@storybook/test';

const meta = {
  title: 'Atoms/MultiSelectChips',
  component: MultiSelectChips,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MultiSelectChips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    field: { value: 'Example' },
    isSelected: false,
    onClick: fn(),
    id: 'example',
  },
};

export const Selected: Story = {
  args: {
    ...Default.args,
    isSelected: true,
  },
};
