import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register/Register'
// import Login from './pages/Login'
// import SetAvatar from './pages/SetAvatar'
import Home from 'pages/Home/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        {/* <Route path='/login' element={<Login/>} /> */}
        {/* <Route path='/setAvatar' element={<SetAvatar />} /> */}
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
