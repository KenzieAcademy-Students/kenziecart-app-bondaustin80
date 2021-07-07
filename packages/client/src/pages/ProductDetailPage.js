import React from 'react'
import { Container } from 'react-bootstrap'
import { ErrorBoundary, LoadingSpinner } from 'components'
import { useAxios } from 'hooks'
import ProductBox from 'components/ProductBox'

export default function ProductDetailPage({
  match: {
    params: { pid },
  },
}) {
  const { data, loading, error } = useAxios({
    config: { url: `products/${pid}` },
  })

  return (
    <Container className='h-100'>
      <ErrorBoundary>
        {error ? (
          <p>Error...</p>
        ) : (
          (() => {
            switch (loading) {
              case false:
                return <ProductBox product={data} />
              case true:
                return <LoadingSpinner full />
              default:
                return null
            }
          })()
        )}
      </ErrorBoundary>
    </Container>
  )
}
