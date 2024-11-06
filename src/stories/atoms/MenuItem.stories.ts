import { Meta, StoryObj } from '@storybook/react';
import MenuItem from '../../components/atoms/MenuItem';

const meta = {
  title: 'Atoms/MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    field: {
      value: {
        href: '/',
        text: 'Example',
      },
    },
  },
};

export const Active: Story = {
  args: {
    ...Default.args,
    isActive: true,
  },
};
