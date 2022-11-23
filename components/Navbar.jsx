import React, { useContext } from 'react'
import Link from 'next/link'

import Cart from './Cart'
import { AiOutlineShopping } from 'react-icons/ai'

import { Context } from '../context/StateContext'

export default function Navbar() {
  const { showCart, setShowCart, totalQuantities } = useContext(Context);

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">JSM Headphones</Link>
      </p>

      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}
