import axios from 'axios'

export const getUsersPublishedPosts = (userId: number) => {
  return axios.get(`http://localhost:3001/posts/publish/${userId}`)
}

export const getFollowingPosts = (userId: number) => {
  return axios.get(`http://localhost:3001/follow/posts/${userId}`)
}

export const getPostsByUsername = (handle: string) => {
  return axios.get(`http://localhost:3001/posts/${handle}`)
}

export const deletePost = (userId: number) => {
  return axios.delete(`http://localhost:3001/post/${userId}`)
}
