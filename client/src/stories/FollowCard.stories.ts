import { FollowCard } from './FollowCard'

import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof FollowCard> = {
  title: 'Components/Follow Page',
  component: FollowCard,
  tags: ['autodocs'],

  argTypes: {
    bio: {
      name: 'Bio',
      description: 'Bio for follow card',
    },
    username: {
      name: 'Username',
      description: 'Username for follow card',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Follow: Story = {
  name: 'Follow Card',

  args: {
    username: 'username',
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A beatae eum voluptatem officia maxime nesciunt cupiditate corporis repellat at. Explicabo ipsam eum quas nobis dolorem assumenda magnam corrupti! Consectetur, fugiat?',
  },
}
