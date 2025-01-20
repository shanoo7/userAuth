import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function Layouts() {
  return (
    <>
      <div className=''>
      <Navbar />
      <Outlet />
      <Toaster />
      </div>
    </>
  )
}

export default Layouts;
