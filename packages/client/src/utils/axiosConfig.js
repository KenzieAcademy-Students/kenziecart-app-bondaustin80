import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from 'constants.js'

const getUserToken = () => {
  const savedUser = JSON.parse(localStorage.getItem('MernAppUser'))
  return savedUser ? savedUser.token : ''
}

// configure axios instance
const instance = axios.create({
  baseURL: `http://localhost:3000/${API_URL}/`,
})

instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.common['Authorization'] = getUserToken()

instance.interceptors.request.use(
  function (config) {
    const token = getUserToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      toast.error('Unauthorized')
    }
    if (error.response.status === 500) {
      toast.error('500 Server Error')
    }
    return Promise.reject(error)
  }
)

export default instance
