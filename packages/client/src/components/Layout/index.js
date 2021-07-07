import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Header } from 'components'
import './Layout.scss'
import 'react-toastify/dist/ReactToastify.min.css'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <ToastContainer />
      <main className='main'>{children}</main>
    </>
  )
}

export default Layout
