import type { Meta, StoryObj } from '@storybook/react';

import Container from '../../components/atoms/Container';

const meta = {
  title: 'Atoms/Container',
  component: Container,

  tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Container',
  },
};
