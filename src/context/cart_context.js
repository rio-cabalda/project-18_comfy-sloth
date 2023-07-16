import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_QUANTITY,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const getLocalStorage = () =>{
  let cart = localStorage.getItem('cart')
  if(cart){
    return JSON.parse(cart)
  }else{
    return []
  }
}

const initialState = {
  cart: getLocalStorage(), // in the first render. this will check if there is 'cart' in the local storage/
                            // if not, return simply empty array. if does, return all the values.
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id,color,quantity,product) => { // add to cart
    dispatch({type: ADD_TO_CART, payload: {id,color,quantity,product}})
  }

  const removeItem = (id) =>{ // remove item
    dispatch({type: REMOVE_CART_ITEM, payload: id})  
  }

  const toggleQuantity = (id, value) => { //toggle quantity
    dispatch({type: TOGGLE_CART_ITEM_QUANTITY, payload: {id, value}})
  }

  const clearCart = () => { // clear the cart
    dispatch({type: CLEAR_CART}) 
  }

  useEffect(()=>{ 
    // everytime cart values changes, this will add the cart value to local storage 
    // and calculate total amount
    dispatch({type: COUNT_CART_TOTALS})
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },[state.cart])

  return (
    <CartContext.Provider value={{...state,addToCart,removeItem,toggleQuantity,clearCart}}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
