import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Pagination from '../../components/molecules/Pagination';

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    width: '100%',
  },
  tags: ['autodocs'],
  args: { onPageChange: fn(), onPrevious: fn(), onNext: fn() },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
  },
};
