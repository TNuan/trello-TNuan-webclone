import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
// import SetAvatar from './pages/SetAvatar'
import Home from 'pages/Home/Home'
import Board from 'pages/Board/Board'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<Home />} />
        <Route path='/board' element={<Board />} />
      </Routes>
    </BrowserRouter>
  )
}
