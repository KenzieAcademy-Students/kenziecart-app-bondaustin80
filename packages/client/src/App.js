import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from 'pages/HomePage'
import ProductDetailPage from 'pages/ProductDetailPage'
import ShoppingCartPage from 'pages/ShoppingCartPage'
import CheckoutPage from 'pages/CheckoutPage'
import { ErrorBoundary, Layout } from 'components'

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/p/:pid' component={ProductDetailPage} />
          <Route exact path='/cart' component={ShoppingCartPage} />
          <Route exact path='/checkout' component={CheckoutPage} />

          <Route
            component={({ location }) => {
              return (
                <div
                  style={{
                    padding: '50px',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  The page <code>{location.pathname}</code> could not be found.
                </div>
              )
            }}
          />
        </Switch>
      </Layout>
    </ErrorBoundary>
  )
}

export default App
