import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons/faShoppingBag'
import { useProvideCart, useUI } from 'hooks'
import './ProductCard.scss'

export default function ProductCard({ product }) {
  const { addItem, isItemInCart } = useProvideCart()
  const { openSidebar } = useUI()

  const handleAddToCart = () => {
    console.log(product)
    openSidebar()
    addItem({ ...product, quantity: 1 })
  }

  return (
    <Container className='mb-3' style={{ height: '300px' }}>
      <Card
        bg='light'
        text='dark'
        style={{ position: 'relative', height: '100%' }}
      >
        <FontAwesomeIcon
          style={{ position: 'absolute', top: '20px', right: '20px' }}
          color={`${isItemInCart(product._id) ? '#FDC54C' : 'grey'}`}
          className='shadow-sm'
          icon={faShoppingBag}
          onClick={handleAddToCart}
        />
        <Card.Img height={150} src={product.productImage}  style={{objectFit: 'cover'}}/>
        <Card.Body>
          <Card.Title as='h6' style={{color: 'info'}}>
            <Row>
              <Col>
                <Link to={`p/${product._id}`}>{product.name}</Link>
              </Col>
              <Col className='text-right font-weight-bold'>
                ${product.price}
              </Col>
            </Row>
          </Card.Title>
          <Card.Text style={{ fontSize: '.8rem' }}>
            {product.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}
