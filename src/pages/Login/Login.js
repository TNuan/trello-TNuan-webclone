import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from 'actions/ApiCall/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '../../assets/logo.svg'

import './Login.scss'

function Login() {
  const navigate = useNavigate()
  const [values, setValue] = useState({
    username: '',
    password: ''
  })

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  }

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/')
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (handleValidation()) {
      login(values).then(data => {
        if (data.status === false) {
          toast.error(data.msg, toastOptions)
        }
        if (data.status === true) {
          localStorage.setItem('chat-app-user', JSON.stringify(data.user))
          navigate('/')
        }
      })
    }
  }

  const handleValidation = () => {
    const { username, password } = values
    if (password === '') {
      toast.error('password and confirm password should be same! ', toastOptions)
      return false
    } else if (username === '') {
      toast.error('Email and Password is requied', toastOptions)
      return false
    }
    return true
  }

  const handleChange = (event) => {
    setValue({ ...values, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className='login-container'>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Trello</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username" 
            onChange={(event) => handleChange(event)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password" onChange={(event) => handleChange(event)}
          />
          <button type="submit">Login</button>
          <span>
            You don&apost have an account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login