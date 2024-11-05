import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import LanguageDrawer from '../../components/atoms/LanguageDrawer';

const meta = {
  title: 'Atoms/LanguageDrawer',
  component: LanguageDrawer,

  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  args: { toggleDrawer: fn() },
} satisfies Meta<typeof LanguageDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    languages: [
      { code: 'en', name: 'English' },
      { code: 'ar', name: 'Arabic' },
    ],
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    languages: [
      { code: 'en', name: 'English' },
      { code: 'ar', name: 'Arabic' },
    ],
  },
};
