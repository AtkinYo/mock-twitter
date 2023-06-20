import type { Meta, StoryObj } from '@storybook/react'

import { Tweet } from './Tweet'

const meta: Meta<typeof Tweet> = {
  title: 'Components/Tweet',
  component: Tweet,
  tags: ['autodocs'],
  // argTypes: {
  //   username: {
  //     name: 'Username',
  //     description: `User's desired display name`,
  //   },
  //   bio: {
  //     name: 'Bio',
  //     description: `User's bio displayed on their profile`,
  //   },
  //   followerCount: {
  //     name: 'Follower Count',
  //     description: `User's follower count`,
  //   },
  //   followingCount: {
  //     name: 'Following Count',
  //     description: `User's following count`,
  //   },
  //   following: {
  //     name: 'Following',
  //     description:
  //       'If true, button will state Follow, else, button display Following',
  //   },
  //   loggedUser: {
  //     name: 'Logged In User',
  //     description: 'Action represents UI for logged in user',
  //   },
  // },
}
export default meta
type Story = StoryObj<typeof meta>

export const NewPostForm: Story = {
  name: 'Post A Tweet',
}
