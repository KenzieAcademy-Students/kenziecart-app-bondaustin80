import React from 'react'
import axios from 'utils/axiosConfig.js'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { useUI } from 'hooks'
import { useProvideCart, useRouter, useCurrency } from 'hooks'
import { CartList, CartSummary, CheckoutBox } from 'components'
import { useState } from 'react'
import './CartSidebarView.scss'
import { toast } from 'react-toastify'

const CartSidebarView = () => {
  const { closeSidebar, displaySidebar } = useUI()
  const { state, applyCoupon } = useProvideCart()
  const { push } = useRouter()
  const { getPrice } = useCurrency()

  const [ code, setCode ] = useState("")

  const handleCoupon = (event) => {
    console.log(event.target.value)
    setCode(event.target.value)
  }

  const handleClose = () => closeSidebar()
  const handleCheckout = () => {
    closeSidebar()
    push('/checkout')
  }

  const applyCode = async () => {
    try {
      const submit = await axios.get(`coupon/verify?couponCode=${code}`)
      const coupon = {
        couponCode: code,
        discount: submit.data
      }
      applyCoupon(coupon)
    } catch (error) {
      toast("Invalid Code")
    }
  }

  return (
    <div className='cart'>
      <header className='cart-header'>
        {displaySidebar && (
          <Button
            onClick={handleClose}
            aria-label='Close panel'
            className='hover:text-gray-500 transition ease-in-out duration-150'
          >
            <FontAwesomeIcon size='xs' icon={faTimes} />
          </Button>
        )}
      </header>

      {state.cart.length > 0 ? (
        <div className='cart-body'>
          <CartList cartItems={state.cart} />
          <label for="couponCode">Coupon: </label>
          <input id="coupon" type="text" name="couponCode" placeholder="Coupon Code" onChange={(e) => handleCoupon(e)}></input>
          <button onClick={applyCode}>Apply</button>
        </div>
      ) : (
        <div className='empty-cart'>
          <FontAwesomeIcon size='xs' icon={faShoppingBag} />
          <p>Your shopping cart is empty</p>
        </div>
      )}

      {state.cart.length > 0 && (
        <div className='cart-checkout'>
          <CartSummary cartTotal={getPrice(state.cartTotal)} />
          <CheckoutBox
            handleShopping={handleClose}
            handleCheckout={handleCheckout}
          />
        </div>
      )}
    </div>
  )
}

export default CartSidebarView
