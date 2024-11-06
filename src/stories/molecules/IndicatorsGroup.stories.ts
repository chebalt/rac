import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import IndicatorsGroup from '../../components/molecules/IndicatorsGroup';

const meta = {
  title: 'Molecules/IndicatorsGroup',
  component: IndicatorsGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof IndicatorsGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 5,
    activeIndex: 0,
    progress: 50,
  },
};
