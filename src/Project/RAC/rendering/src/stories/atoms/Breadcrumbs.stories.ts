import type { Meta, StoryObj } from '@storybook/react';

import Breadcrumbs from '../../components/atoms/Breadcrumbs';

const meta = {
  title: 'Atoms/Breadcrumbs',
  component: Breadcrumbs,

  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: '/contacts/contact-form',
  },
};
