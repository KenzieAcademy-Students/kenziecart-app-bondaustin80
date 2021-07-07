import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    productImage: { type: String, default: 'perfume.png' },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
