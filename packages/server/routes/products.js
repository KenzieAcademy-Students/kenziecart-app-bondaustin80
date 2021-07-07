import express from 'express'
const router = express.Router()
import jwt from 'jsonwebtoken'
import keys from '../config/keys'
import { User, Product } from '../models'
import { requireAuth } from '../middleware'

router.get('/', async (request, response) => {
  const products = await Product.find({}).sort({ created: -1 })

  response.json(products.map((products) => products.toJSON()))
})

router.post('/', async (request, response) => {
  const { name, price } = request.body
  const post = new Post({
    name: name,
    price: price,
  })

  const savedProduct = await post.save()
  response.json(savedProduct.toJSON())
})

router.get('/:id', async (request, response) => {
  const product = await Product.findById(request.params.id)

  if (product) {
    response.json(product.toJSON())
  } else {
    response.status(404).end()
  }
})

router.all('/like/:productId', requireAuth, async (request, response) => {
  const { productId } = request.params
  const { user } = request
  const product = await Post.findOne({ _id: productId })

  if (!product) {
    return response.status(422).json({ error: 'Cannot find post' })
  }
  try {
    if (user.likedProducts.includes(product.id)) {
      const result = await user.updateOne({
        $pull: { likedProducts: product.id },
      })

      response.json(result)
    } else {
      const result = await user.updateOne({
        $push: { likedProducts: products.id },
      })

      response.json(result)
    }
  } catch (err) {
    return response.status(422).json({ error: err })
  }
})

router.put('/comments', async (request, response) => {
  const { text, productId } = request.body
  const { user } = request

  const comment = {
    text: text,
    author: user.id,
  }
  const populateQuery = [{ path: 'comments.author', select: 'username' }]
  Product.findByIdAndUpdate(
    productId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate(populateQuery)
    .exec((err, result) => {
      if (err) {
        return response.status(422).json({ error: err })
      } else {
        response.json(result)
      }
    })
})

module.exports = router
