import axios from 'axios'

export const getFollowing = (userId: number) => {
  return axios.get(`http://localhost:3001/following/${userId}`)
}

export const getFollowers = (userId: number) => {
  return axios.get(`http://localhost:3001/followers/${userId}`)
}
