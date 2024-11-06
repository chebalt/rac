import type { Meta, StoryObj } from '@storybook/react';

import Accordion from '../../components/atoms/Accordion';

const meta = {
  title: 'Atoms/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        title: { value: 'Title 1' },
        description: { value: 'Description 1' },
      },
      {
        title: { value: 'Title 2' },
        description: { value: 'Description 2' },
      },
    ],
  },
};
