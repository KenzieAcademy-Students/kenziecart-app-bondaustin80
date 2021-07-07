import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ProductCard from 'components/ProductCard'

export default function ProductsBox({ filteredProducts }) {
  return (
    <Row xs={1} md={2} lg={3} noGutters>
      {filteredProducts.map((p) => (
        <Col key={p._id}>
          <ProductCard product={p} />
        </Col>
      ))}
    </Row>
  )
}
