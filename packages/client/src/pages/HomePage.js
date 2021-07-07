import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import useAxios from 'hooks/useAxios'
import {
  ProductsBox,
  ProductsFilter,
  LoadingSpinner,
  ErrorBoundary,
} from 'components'
import { CATEGORIES } from 'constants.js'

export default function HomePage(props) {
  const { data, loading, error } = useAxios({
    config: { url: 'products' },
  })

  const [filteredData, setFilteredData] = useState(null)
  const [searchInput, setSearchInput] = useState('')

  const [categories, setCategories] = useState(
    CATEGORIES.reduce(
      (names, name) => ({
        ...names,
        [name]: true,
      }),
      {}
    )
  )

  const handleInput = (e) => {
    const searchStr = e.target.value.toLowerCase()
    setSearchInput(searchStr)
    const filteredList = [...data].filter((i) =>
      i.name.toLowerCase().includes(searchStr)
    )

    setFilteredData(filteredList)
  }

  const handleSelect = (e) => {
    const option = e.target.value.toLowerCase()

    switch (option) {
      case 'price-asc':
        let sortedDataAsc = [...filteredData].sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        )
        setFilteredData(sortedDataAsc)
        break
      case 'price-dsc':
        let sortedDataDsc = [...filteredData].sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        )
        setFilteredData(sortedDataDsc)
        break
      default:
        break
    }
  }

  const handleCheckboxChange = (e) => {
    const { id } = e.target
    setCategories({
      ...categories,
      [id]: !categories[id],
    })
  }

  const filterByCat = (list) => {
    const filteredList = Object.keys(categories).filter(
      (cat) => categories[cat]
    )
    return [
      ...list.filter((i) => {
        return filteredList.includes(i.category)
      }),
    ]
  }

  useEffect(() => {
    data && setFilteredData(data)
  }, [data])

  return (
    <Container fluid style={{overflow: 'hidden'}}>
      <Row>
        <Container
          fluid
          style={{
            width: '100%',
            height: '350px',
            backgroundImage: "url('/hero_image.png')",
            backgroundSize: 'cover',
            margin: '60px 0px',
          }}
        >
          <div style={{ position: 'relative', top: '65%', left: '5%' }}>
            <h4>Lifestyle products made simple</h4>
          </div>
        </Container>
      </Row>

      <Row className='mt-4' noGutters>
        <Col xs={12} sm={4} lg={3}>
          <ProductsFilter
            filterInput={handleInput}
            filterSelect={handleSelect}
            categories={categories}
            searchInput={searchInput}
            onCheckboxChange={handleCheckboxChange}
          />
        </Col>
        <Col>
          <ErrorBoundary>
            {error && <p>Error...</p>}
            {loading && <LoadingSpinner />}
            {filteredData && (
              <ProductsBox filteredProducts={filterByCat(filteredData)} />
            )}
          </ErrorBoundary>
        </Col>
      </Row>
    </Container>
  )
}
