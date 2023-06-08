import type { Meta, StoryObj } from '@storybook/react'

import { Post } from './Post'

const meta: Meta<typeof Post> = {
  title: 'Components/Post',
  component: Post,
  tags: ['autodocs'],
  argTypes: {
    username: {
      name: 'Username',
      description: `User's desired display name`,
    },
    content: {
      name: 'Tweet Content',
      description: `User's tweet`,
    },

    timestamp: {
      name: 'Timestamp',
      description: 'Time when tweet was created',
    },

    backgroundColor: {
      name: 'Background Color',
      description: `Background color of the user's tweet`,
      control: 'color',
    },

    loggedInUser: {
      name: 'Logged In User',
      description:
        'Determines whether or not the state applies to the current logged-in user',
    },

    likedPost: {
      name: 'Liked Post',
      description: 'Determines if the post has been liked',
    },

    published: {
      defaultValue: false,
      description: 'States whether the post is published or drafted',
    },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const PublishedPost: Story = {
  name: 'Published Post',

  args: {
    username: 'username',
    timestamp: '41m',
    content: 'This is a published post by the user',
    likedPost: false,
    iconBackgroundColor: 'bg-slate-400',
    loggedInUser: false,
    published: true,
  },
}

export const LikedPost: Story = {
  name: 'Liked Post',

  args: {
    username: 'username',
    timestamp: '41m',
    content: 'This is a liked post',
    likedPost: true,
    iconBackgroundColor: 'bg-slate-400',
    loggedInUser: false,
    published: true,
  },
}

export const DraftedPost: Story = {
  name: 'Drafted Post',

  args: {
    username: 'username',
    timestamp: '41m',
    content: 'This is a drafted post by the user',
    likedPost: false,
    iconBackgroundColor: 'bg-slate-400',
    loggedInUser: true,
    published: false,
  },
}

export const LoggedUserPublishedPost: Story = {
  name: 'Logged Published Post',

  args: {
    username: 'username',
    timestamp: '41m',
    content: 'This is a published post by the user',
    iconBackgroundColor: 'bg-slate-400',
    loggedInUser: true,
    published: true,
  },
}

export const LoggedUserLikedPost: Story = {
  name: 'Logged Liked Post',

  args: {
    username: 'username',
    timestamp: '41m',
    content: 'This is a user liking their own post',
    likedPost: true,
    iconBackgroundColor: 'bg-slate-400',
    loggedInUser: true,
    published: true,
  },
}
