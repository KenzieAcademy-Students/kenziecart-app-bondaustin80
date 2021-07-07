import React from 'react'
import { Container, Button, Image, Figure } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons/faShoppingBag'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { useUI, useProvideCart } from 'hooks'
import './ProductBox.scss'

export default function ProductBox({ product }) {
  const { openSidebar } = useUI()
  const { addItem, removeItem, isItemInCart } = useProvideCart()

  const handleAddToCart = () => {
    console.log(product)

    openSidebar()
    addItem({ ...product, quantity: 1 })
  }

  const handleRemoveFromCart = () => {
    removeItem(product._id)
  }

  return (
    <Container className='p-sm-2 p-md-4'>
      <div className='row justify-content-center mb-2'>
        <div className='col-xs-8 col-md-7'>
          <Image width='100%' src={`/${product.productImage}`} />
        </div>
      </div>
      <div className='row h-25 justify-content-center'>
        <div className='col-xs-8 col-md-7'>
          <div className='row h-25'>
            <div className='col-6 align-self-center'>
              <h4>{product.name}</h4>
            </div>
            <div className='col-6 align-self-center text-right mb-2'>
              <div className='text-secondary'>
                <h3>$ {product.price}</h3>
              </div>
            </div>
            <div className='col-12 align-self-center mb-3'>
              <Figure.Caption>{product.description} </Figure.Caption>
            </div>
          </div>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-xs-8 col-md-7'>
          <div className='text-right'>
            {isItemInCart(product._id) && (
              <span className='mr-2'>
                <Button
                  variant='outline-danger'
                  onClick={handleRemoveFromCart}
                  disabled={!isItemInCart(product._id)}
                >
                  <span>Remove</span>
                  <span className='ml-2'>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </Button>
              </span>
            )}
            <Button variant='outline-primary' onClick={handleAddToCart}>
              <span>Add to Cart</span>
              <span className='ml-2'>
                <FontAwesomeIcon icon={faShoppingBag} />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
