import React from 'react'
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useProductsContext } from '../context/products_context'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'

const CartButtons = () => {
  const {closeSidebar} = useProductsContext();
  const {total_items} = useCartContext()
  const {loginWithRedirect,isAuthenticated,user, myUser, logout} = useUserContext()
  console.log(myUser);
  return (
  <Wrapper className='cart-btn-wrapper'> 
    <Link to='/cart' className='cart-btn' onClick={closeSidebar}>
      Cart
      <span className='cart-container'>
        <FaShoppingCart />
        <span className='cart-value'>{total_items}</span>
      </span>
    </Link>
    {isAuthenticated ? 
      <div className='login-container'>
          <img src={myUser?.picture}  alt="login user" />
          <div className="user">
            <span className='user-name'>{myUser?.name ? myUser?.name: 'user'}</span>
            <button type='button'
            onClick={()=>logout({returnTo: window.location.origin})}>
              logout
            </button>
          </div>
      </div>
    : <button type='button' className='auth-btn'
    onClick={loginWithRedirect}>
      Login <FaUserPlus/>
    </button>}
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
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    display: flex;
    align-items: center;
    
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
    line-height: 1;
    
      span {
      text-transform: capitalize;
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
        transition: all 200ms ease-in;
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
    font-size: 1.4rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`
export default CartButtons
