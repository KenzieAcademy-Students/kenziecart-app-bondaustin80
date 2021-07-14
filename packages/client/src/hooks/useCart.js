import React, { useReducer, useContext, createContext, useEffect } from 'react'

const initialState = {
  cart: [],
  itemCount: 0,
  cartTotal: 0,
  couponName: "",
  discount: 1,
}

const calculateCartTotal = (cartItems) => {
  let total = 0

  console.log(cartItems)

  cartItems.map((item) => (total += item.price * item.quantity))

  return parseFloat(total.toFixed(2))
}

const reducer = (state, action) => {
  let nextCart = [...state.cart];
  switch (action.type) {
    case 'ADD_ITEM':
      const existingIndex = nextCart.findIndex(
        (item) => item._id === action.payload._id
      )

      const numItemsToAdd = action.payload.quantity;

      console.log(numItemsToAdd)

      if (existingIndex >= 0) {
        const newQuantity = parseInt(
          nextCart[existingIndex].quantity + numItemsToAdd
        )
        nextCart[existingIndex] = {
          ...action.payload,
          quantity: newQuantity,
        }
      } else {
        nextCart.push(action.payload)
      }

      localStorage.setItem("KenzieCart", JSON.stringify(nextCart))

      return {
        ...state,
        cart: nextCart,
        itemCount: state.itemCount + numItemsToAdd,
        cartTotal: calculateCartTotal(nextCart),
        couponName: state.couponName,
        discount: state.discount,
      }
    case 'REMOVE_ITEM':
      nextCart = nextCart
        .map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

        localStorage.setItem("KenzieCart", JSON.stringify(nextCart))

      return {
        ...state,
        cart: nextCart,
        itemCount: state.itemCount > 0 ? state.itemCount - 1 : 0,
        cartTotal: calculateCartTotal(nextCart),
        couponName: state.couponName,
        discount: state.discount,
      }
    case 'REMOVE_ALL_ITEMS':
      let quantity = state.cart.find((i) => i._id === action.payload).quantity
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
        itemCount: state.itemCount > 0 ? state.itemCount - quantity : 0,
      }
    case 'RESET_CART':
      localStorage.clear()
      return { ...initialState }
    case 'LOAD_CART':
      localStorage.getItem("KenzieCart")
      return { ...state }
    case 'UPDATE_CART':
      localStorage.setItem("KenzieCart", JSON.stringify(nextCart))
      return {
        ...state,
        cart: nextCart,
        itemCount: nextCart.length,
        cartTotal: calculateCartTotal(nextCart),
        couponName: state.couponName,
        discount: state.discount,
      }
    case 'INIT_SAVED_CART':
      const savedCart = action.payload
      let savedCount = 0
      for (let i = 0; i < savedCart.length; i++) {
        savedCount = savedCount + savedCart[i].quantity
      }
      return {
        ...state,
        cart: savedCart,
        itemCount: savedCount,
        cartTotal: calculateCartTotal(savedCart),
      }
    case 'APPLY_COUPON':
      const couponName = action.payload.couponCode
      console.log(couponName)
      const discount = action.payload.discount
      console.log(discount)
      return {
        ...state,
        couponName: couponName,
        discount: discount,
      }
    default:
      return state
  }
}

const cartContext = createContext()

// Provider component that wraps your app and makes cart object ...
// ... available to any child component that calls useCart().
export function ProvideCart({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const savedCart = JSON.parse(localStorage.getItem('KenzieCart')) || false
  if (!savedCart) {
    localStorage.setItem("KenzieCart", JSON.stringify(state))
  }
  return (
    <cartContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </cartContext.Provider>
  )
}

// Hook for child components to get the cart object ...
// ... and re-render when it changes.
export const useCart = () => {
  return useContext(cartContext)
}

// Provider hook that creates cart object and handles state
const useProvideCart = () => {
  const { state, dispatch } = useCart()

  const addItem = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    })
  }

  const removeItem = (id) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id,
    })
  }

  const removeAllItems = (id) => {
    dispatch({
      type: 'REMOVE_ALL_ITEMS',
      payload: id,
    })
    dispatch({
      type: 'UPDATE_CART'
    })
  }

  const resetCart = () => {
    dispatch({
      type: 'RESET_CART',
    })
  }

  const isItemInCart = (id) => {
    return !!state.cart.find((item) => item._id === id)
  }

  const loadCart = () => {
    dispatch({
      type: "LOAD_CART",
    })
  }

  const updateCart = () => {
    dispatch({
      type: "UPDATE_CART"
    })
  }

  const applyCoupon = (coupon) => {
    dispatch({
      type: "APPLY_COUPON",
      payload: coupon,
    })
  }

  //  Check for saved local cart on load and dispatch to set initial state
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('KenzieCart')) || false
    if (savedCart.cart) {
      dispatch({
        type: 'INIT_SAVED_CART',
        payload: savedCart.cart,
      }) 
      }
  }, [dispatch])

  return {
    state,
    addItem,
    removeItem,
    removeAllItems,
    resetCart,
    isItemInCart,
    calculateCartTotal,
    loadCart,
    updateCart,
    applyCoupon,
  }
}

export default useProvideCart
