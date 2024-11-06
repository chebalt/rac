import type { Meta, StoryObj } from '@storybook/react';

import Hero from '../../components/organisms/Hero';

const meta = {
  title: 'Organisms/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

//FIX ME
/* export const Primary: Story = {
  args: {
    variant: 'primary',

    fields: {
      title: { value: 'Hero Title' },
      image: {
        value: { src: '/images/1.jpeg', alt: 'Hero Image' },
      },
      tags: [{ value: 'Tag 1' }],
      content: { value: 'Hero Content' },
      label: { value: 'Hero Label' },
      link: { value: { href: 'https://www.google.com', text: 'Hero Link' } },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',

    fields: {
      title: { value: 'Hero Title' },
      image: {
        value: { src: '/images/1.jpeg', alt: 'Hero Image' },
      },
      tags: [{ value: 'Tag 1' }],
      content: { value: 'Hero Content' },
      label: { value: 'Hero Label' },
      link: { value: { href: 'https://www.google.com', text: 'Hero Link' } },
    },
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',

    fields: {
      title: { value: 'Hero Title' },
      image: {
        value: { src: '/images/1.jpeg', alt: 'Hero Image' },
      },
      tags: [{ value: 'Tag 1' }],
      content: { value: 'Hero Content' },
      label: { value: 'Hero Label' },
      link: { value: { href: 'https://www.google.com', text: 'Hero Link' } },
    },
  },
};

export const Quaternary: Story = {
  args: {
    variant: 'quaternary',

    fields: {
      title: { value: 'Hero Title' },
      image: {
        value: { src: '/images/1.jpeg', alt: 'Hero Image' },
      },
      tags: [{ value: 'Tag 1' }, { value: 'Tag 2' }],
    },
  },
}; */
