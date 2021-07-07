import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useProvideCart } from 'hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import './ItemCounter.scss'

const ItemCounter = ({ item }) => {
  const { addItem, removeItem } = useProvideCart()

  const [quantity, setQuantity] = useState(item.quantity)
  const [pending, setPending] = useState(false)

  const updateQuantity = async (quantity) => {
    let numItemsToAdd = quantity - item.quantity;
    addItem({ ...item, quantity: numItemsToAdd })
  }

  // After they type into the quantity field, the value is pending until the field blurs
  // Once it blurs, then resolve the value that they typed and update the cart
  const handleQuantity = (e) => {
    setQuantity(e.target.value)
    setPending(true)
  }
  const handleBlur = () => {
    let val = Number(quantity);
    
    if (isNaN(val)) {
      val = item.quantity;
    }
    if (val > 99) {
      val = 99;
    }
    if (val !== quantity) {
      setQuantity(val);
    }
    if (val !== item.quantity) {
      updateQuantity(val)
      setPending(false)
    }
  }
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
      updateQuantity(val)
    }
  }

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (!pending) {
      if (item.quantity !== Number(quantity)) {
        setQuantity(item.quantity)
      }
    }
  }, [item, quantity, pending])

  return (
    <div className='flex items-center mt-3'>
      <Button variant='none' onClick={() => removeItem(item._id)}>
        <FontAwesomeIcon size='xs' icon={faMinus} />
      </Button>
      <label>
        <input
          type="text" pattern="[0-9]*"
          className='quantity'
          max={99}
          min={0}
          value={quantity}
          onChange={handleQuantity}
          onBlur={handleBlur}
        />
      </label>
      <Button variant='none' onClick={() => increaseQuantity(1)}>
        <FontAwesomeIcon size='xs' icon={faPlus} />
      </Button>
    </div>
  )
}

export default ItemCounter
