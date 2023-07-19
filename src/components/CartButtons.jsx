import React from 'react'
import { FaShoppingCart, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useProductsContext } from '../context/products_context'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'

const CartButtons = () => {
  const {closeSidebar} = useProductsContext();
  const {total_items, clearCart} = useCartContext()
  const {loginWithRedirect,isLoading, myUser, logout} = useUserContext()
  return (
  <Wrapper className='cart-btn-wrapper'> 
    <Link to='/cart' className='cart-btn' onClick={closeSidebar}>
      Cart
      <span className='cart-container'>
        <FaShoppingCart />
        <span className='cart-value'>{total_items}</span>
      </span>
    </Link>
    {!isLoading && <>
    {myUser ? 
      <div className='login-container'>
          <img src={myUser?.picture}  alt="login user" />
          <div className="user">
            <span className='user-name'>{myUser?.name ? myUser?.name: 'user'}</span>
            <button type='button'
            onClick={()=>{
              clearCart()
              logout({returnTo: window.location.origin})}
            }>
              logout
            </button>
          </div>
      </div>
    : <button type='button' className='auth-btn'
      onClick={loginWithRedirect}>
      Login <FaUserPlus/>
    </button>}
    </>}
  </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  justify-content: center;
  column-gap: 1.9rem;

 
  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.2rem;
    letter-spacing: var(--spacing);
    display: flex;
    align-items: center;
    backface-visibility: hidden;
    transform-origin: center;
  }
  @keyframes bubbleEffect {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  .cart-btn:hover {
    animation: bubbleEffect 1s infinite;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .login-container {
    display: flex;
    align-items: center;
    gap: .8rem;
    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      object-fit: cover;
    }
    
  }
  .user {
    display: flex;
    flex-direction: column;
    row-gap: .2rem;
    line-height: 1;
    
      span {
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: var(--spacing);
      }
      button {
        background: transparent;
        border-color: transparent;
        font-size: .8rem;
        text-transform: capitalize;
        cursor: pointer;
        color: var(--clr-grey-3);
        letter-spacing: var(--spacing);
        align-self: start;
        position: relative;
      }
      button::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 50%;
        transform-origin: center;
        transform: translateX(-50%);
        width: 0;
        height: 2px;
        background: var(--clr-grey-3);
        transition: width 150ms ease-in;
      }
      button:hover::after{
        width: 90%;
      }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.2rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`
export default CartButtons
