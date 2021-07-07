import React from 'react'
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap'
import { CartList } from 'components'
import { useProvideCart } from 'hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'

export default function ShoppingCartPage() {
  const { state, addItem, removeItem } = useProvideCart()

  return (
    <Container fluid style={{ height: 'calc(100vh - 72px)' }}>
      <Row className='h-100'>
        <Col xs='7' className='h-100'>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Shopping Cart</Card.Title>
            </Card.Body>
            <ListGroup className='list-group-flush'>
              {state.cart.length > 0 ? (
                <div className='cart-body'>
                  <CartList
                    cartItems={state.cart}
                    close={null}
                    addItem={addItem}
                    removeItem={removeItem}
                  />
                </div>
              ) : (
                <div className='empty-cart'>
                  <FontAwesomeIcon size='xs' icon={faShoppingBag} />
                  <p>Your shopping cart is empty</p>
                </div>
              )}
            </ListGroup>
            <Card.Body>
              <Card.Link>Continue Shopping</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col style={{ backgroundColor: 'dodgerblue' }} />
      </Row>
    </Container>
  )
}
