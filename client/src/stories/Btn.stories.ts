import type { Meta, StoryObj } from '@storybook/react'

import { Btn } from './Btn.tsx'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Btn',
  component: Btn,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Btn>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const CTA: Story = {
  args: {
    label: 'Btn',
    backgroundColor: 'bg-blue-600',
  },
}
