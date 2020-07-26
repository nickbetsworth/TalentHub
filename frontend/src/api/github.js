import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL

export const getApiLimits = () => {
  return axios.get('apiLimits').then(response => {
    return response.data[3].resources
  })
}

export const getUsers = (location, page) => {
  return axios.get(`users?location=${location}&page=${page}`).then(response => {
    return response.data
  })
}