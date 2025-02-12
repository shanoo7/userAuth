import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Layouts from './Layouts.jsx'
import ProtectedRouts from './ProtectedRoutes.jsx'
import OTPReset from './pages/OTPReset.jsx'
import Sidebar from './components/Sidebar.jsx'
import Homepage from './pages/Homepage.jsx'
import Portfolio from './pages/Portfolio.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layouts />}>

       {/* Protected Routes */}
       <Route element={<ProtectedRouts />}>
        <Route element={<Sidebar />}>
          <Route index element={<Homepage />} /> {/* Default protected route */}
          <Route path='homePage' element={<Homepage />} />
          <Route path='portfolio' element={<Portfolio />} />
        </Route>
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
