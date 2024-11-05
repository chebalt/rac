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

export const Primary: Story = {
  args: {
    variant: 'primary',
    props: {
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
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    props: {
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
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    props: {
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
  },
};

export const Quaternary: Story = {
  args: {
    variant: 'quaternary',
    props: {
      fields: {
        title: { value: 'Hero Title' },
        image: {
          value: { src: '/images/1.jpeg', alt: 'Hero Image' },
        },
        tags: [{ value: 'Tag 1' }, { value: 'Tag 2' }],
      },
    },
  },
};
