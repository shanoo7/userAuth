import React from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast';
import Signup from './pages/Signup';

function App() {
  return (
    <>
    <div className=''>
    <Navbar/>
    <Login/>
    <Signup/>
    </div>
 
    <Toaster/>
    </>
  )
}

export default App
