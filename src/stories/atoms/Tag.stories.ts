import type { Meta, StoryObj } from '@storybook/react';

import Tag from '../../components/atoms/Tag';

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: {
      value: 'Tag',
    },
    variant: 'default',
    size: 'small',
  },
};

export const Invert: Story = {
  args: {
    ...Default.args,
    variant: 'invert',
  },
};
