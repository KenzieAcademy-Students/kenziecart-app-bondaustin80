import React from 'react'
import { CartItem } from 'components'

export default function CartList({ cartItems }) {
  return (
    <div className='cart-list'>
      {cartItems.map((item, index) => (
        <CartItem key={index} item={item} />
      ))}
    </div>
  )
}
