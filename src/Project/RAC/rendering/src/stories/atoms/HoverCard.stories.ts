import type { Meta, StoryObj } from '@storybook/react';

import HoverCard from '../../components/atoms/HoverCard';

const meta = {
  title: 'Atoms/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fields: {
      image: {
        value: {
          src: 'https://placehold.co/600x400',
        },
      },
      title: {
        value: 'Title',
      },
      description: {
        value: 'Description',
      },
    },
    width: 'w-[288px]',
    height: 'h-[227px]',
  },
};
