import React, { createContext, useContext, useReducer, useMemo } from 'react'

const initialState = {
  currencyType: "USD",
  symbol: "$",
  multiplier: 1.0,
}

export const CurrencyContext = createContext(initialState)

CurrencyContext.displayName = 'CurrencyContext'

function currencyReducer(state, action) {
  switch (action.type) {
    case 'SET_CURRENCY': {
      if (action.payload === "USD") {
          return {
              ...state,
              currencyType: "USD",
              symbol: "$",
              multiplier: 1.0,
          }
      }
      return {
        ...state,
        currencyType: "Euro",
        symbol: "€",
        multiplier: .8,
      }
    }
    default:
      return state
  }
}

export const CurrencyProvider = (props) => {
  const [state, dispatch] = useReducer(currencyReducer, initialState)

  const setCurrency = (currency) => dispatch({ type: 'SET_CURRENCY', payload: currency })

  const getPrice = (amount) => {
      if (state.currencyType === "USD") {
          return state.symbol + amount
      } else {
          let newAmount = state.multiplier * amount
          return state.symbol + newAmount
      }
  }

  const value = useMemo(
    () => ({
      ...state,
      setCurrency,
      getPrice,
    }),
    [state]
  )

  return <CurrencyContext.Provider value={value} {...props} />
}

const useCurrency = () => {
  const context = useContext(CurrencyContext)

  return context
}

export const ManageCurrencyContext = ({ children }) => (
  <CurrencyProvider>{children}</CurrencyProvider>
)

export default useCurrency
