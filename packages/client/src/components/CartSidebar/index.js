import React from 'react'
import { useUI } from 'hooks'
import { CartSidebarView } from 'components'
import './CartSidebar.scss'
export default function CartSidebar() {
  const { displaySidebar, toggleSidebar } = useUI()

  return (
    <div
      className={displaySidebar ? 'mini-cart-open' : 'hidden-mini-cart'}
      aria-hidden={displaySidebar ? false : true}
    >
      <div className='mini-cart'>
        <CartSidebarView />
      </div>
      <div
        className={
          displaySidebar ? 'drawer-backdrop dark-overflow' : 'drawer-backdrop'
        }
        onClick={toggleSidebar}
      />
    </div>
  )
}
