import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Layouts from './Layouts.jsx'
import Homepage from './pages/Homepage.jsx'
import ProtectedRouts from './ProtectedRoutes.jsx'
import OTPReset from './pages/OTPReset.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layouts />}>

      //protectedRoutes
      <Route element={<ProtectedRouts />}>
        <Route path='' element={<Homepage />} />
      </Route>

      //publicRoutes
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/otp-reset' element={<OTPReset />} />
      
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
