import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { FaTimes, FaShoppingCart, FaUserPlus } from 'react-icons/fa'
import { links } from '../utils/constants'
import styled from 'styled-components'
import { useUserContext } from '../context/user_context'
import { useCartContext } from '../context/cart_context'

const Sidebar = () => {
  const {isSidebarOpen, closeSidebar} = useProductsContext();
  const {total_items, clearCart} = useCartContext()
  const {myUser,logout,loginWithRedirect} = useUserContext();

  return (
  <SidebarContainer>
    <aside className={`${isSidebarOpen ? 'sidebar show-sidebar' :'sidebar'}`}>
      <div className="sidebar-header">
        <img src={logo} alt="comfy sloth" />
        <button type='button' className="close-btn"
        onClick={closeSidebar}
        >
          <FaTimes />
        </button>
      </div>
      <div className="sidebar_user">
      {myUser ?  (
        <div className="sidebar_logged-in">
          <img src={myUser?.picture}  alt="login user" />
          <span> {myUser?.name ? myUser?.name: 'user'}</span>
        </div>)
        :
        <div className="sidebar_login">
        </div>
        }
            
          </div>
      <ul className="links">
        {links.map((link)=>{
          const {id,text,url} = link;
          return (
            <li key={id}>
                <Link to={url} onClick={closeSidebar}>
                  {text}
                </Link>
            </li>
          )
        })}
       {myUser &&  (
        <li>
          <Link to='/checkout' onClick={closeSidebar}>Checkout</Link>
        </li>)}
        <li>
            <Link to='/cart' className='link_cart-btn' onClick={closeSidebar}>
              cart
              <span className='link_cart-container'>
                <FaShoppingCart />
                <span className='link_cart-value'>{total_items}</span>
              </span>
            </Link>
        </li>
        <li>
            {myUser ? 
            <div>
              <button type='button' className='link_auth-btn'
              onClick={()=>{
                clearCart()
                logout({returnTo: window.location.origin})}
              }>
                logout
              </button>
            </div>
            :
            <div>
              <button type='button' className='link_auth-btn'
              onClick={loginWithRedirect}>
              Login <FaUserPlus/>
              </button>
            </div>
            }
        </li>
      </ul>

    </aside>
  </SidebarContainer>)
}

const SidebarContainer = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
    color: var(--clr-red-dark);
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: var(--clr-red-light);
  }
  .logo {
    justify-self: center;
    height: 45px;
  }
  .sidebar_user{
    display: block;
  }
  .sidebar_logged-in {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
    img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      object-fit: cover;
    }
    span {
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: var(--spacing);
      }
  }
  .links {
    margin-bottom: 2rem;
    cursor: pointer;
  }
  .links a, div {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover, div:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-grey-10);
    color: var(--clr-grey-2);
  }
  .link_auth-btn {
    display: block;
    width: 100%;
    background: transparent;
    border: none;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: .193rem 0;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
    cursor: pointer;
  }
  
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--clr-white);
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .link_cart-btn {
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    display: flex !important;
    height: max-content;
    font-size: 1rem;
  }
  .link_cart-container {
    position: relative;
    display: flex;
    align-items: center;

    svg {
      margin-left: 5px;
      flex-shrink: 0;
    }
  }
  .link_cart-value {
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
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`

export default Sidebar
