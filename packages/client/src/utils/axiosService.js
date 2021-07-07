import axios from 'utils/axiosConfig.js'

const getAllProducts = () => {
  return axios.get('products')
}

const getProductById = (id) => {
  return axios({
    config: {
      url: `products/${id}`,
      params: {
        id: id,
      },
    },
  })
}

const createOrder = (data) => {
  return axios.post('/orders', data)
}

const findByName = (name) => {
  return axios.get(`/products?name=${name}`)
}

export { getAllProducts, getProductById, createOrder, findByName }
