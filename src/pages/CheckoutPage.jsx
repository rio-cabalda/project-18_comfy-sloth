import React from 'react'
import styled from 'styled-components'
import { PageHero, PaypalCheckout } from '../components'
// extra imports
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'

const CheckoutPage = () => {
  const {cart} = useCartContext()
  return (
    <main>
      <PageHero title='checkout'/>
      <Wrapper className='page'>
        {cart.length < 1 ? (
        <div className='empty'>
          <h2>your cart is empty</h2>
          <Link to='/products' className='btn'>Add product(s)</Link>
        </div>) :
         <PaypalCheckout /> 
        }
       
      </Wrapper>
    </main>
  )
}
const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;

.empty {
  text-align: center;
}
`
export default CheckoutPage
