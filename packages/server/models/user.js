import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
  },
  profile_image: { type: String, default: '/thor-3831290.svg' },
  likedProducts: [
    {
      type: ObjectId,
      ref: 'Product',
    },
  ],
  orders: [
    {
      type: ObjectId,
      ref: 'Order',
    },
  ],
})

const User = mongoose.model('User', userSchema)

export default User
