import type { Meta, StoryObj } from '@storybook/react'

import { ProfileHeader } from './ProfileHeader'

const meta: Meta<typeof ProfileHeader> = {
  title: 'Components/Profile',
  component: ProfileHeader,
  tags: ['autodocs'],
  argTypes: {
    username: {
      name: 'Username',
      description: `User's desired display name`,
    },
    bio: {
      name: 'Bio',
      description: `User's bio displayed on their profile`,
    },
    followerCount: {
      name: 'Follower Count',
      description: `User's follower count`,
    },
    followingCount: {
      name: 'Following Count',
      description: `User's following count`,
    },
    following: {
      name: 'Following',
      description:
        'If true, button will state Follow, else, button display Following',
    },
    loggedUser: {
      name: 'Logged In User',
      description: 'Action represents UI for logged in user',
    },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const Header: Story = {
  name: 'Logged User Header',

  args: {
    username: 'username',
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A beatae eum voluptatem officia maxime nesciunt cupiditate corporis repellat at. Explicabo ipsam eum quas nobis dolorem assumenda magnam corrupti! Consectetur, fugiat?',
    followerCount: 123,
    followingCount: 456,
    following: false,
    loggedUser: true,
    backgroundColor: 'bg-slate-400',
  },
}

export const UserHeader: Story = {
  args: {
    username: 'username',
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A beatae eum voluptatem officia maxime nesciunt cupiditate corporis repellat at. Explicabo ipsam eum quas nobis dolorem assumenda magnam corrupti! Consectetur, fugiat?',
    followerCount: 123,
    followingCount: 456,
    following: false,
    loggedUser: false,
    backgroundColor: 'bg-slate-400',
  },
}

export const FollowingUserHeader: Story = {
  args: {
    username: 'username',
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A beatae eum voluptatem officia maxime nesciunt cupiditate corporis repellat at. Explicabo ipsam eum quas nobis dolorem assumenda magnam corrupti! Consectetur, fugiat?',
    followerCount: 123,
    followingCount: 456,
    following: true,
    loggedUser: false,
    backgroundColor: 'bg-slate-400',
  },
}
