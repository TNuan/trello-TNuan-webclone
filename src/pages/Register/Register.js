import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from 'actions/ApiCall/index'
import { ToastContainer, toast } from 'react-toastify'
import Logo from '../../assets/logo.svg'

import './Register.scss'

function Register() {
  const navigate = useNavigate()
  const [values, setValue] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
      const { data } = register(values)
      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        navigate('/')
      }
    }
  }

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values
    if (password !== confirmPassword) {
      toast.error(
        'password and confirm password should be same! ',
        toastOptions
      )
      return false
    } else if (username.length < 3) {
      toast.error(
        'Username should be greater than 3 characters', 
        toastOptions
      )
      return false
    } else if (password.length < 8) {
      toast.error(
        'Password should be greater than 8 characters', 
        toastOptions
      )
      return false
    } else if (email === '') {
      toast.error('email is requied', toastOptions)
      return false
    }
    return true
  }

  const handleChange = (event) => {
    setValue({ ...values, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className='register-container'>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Trello</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username" onChange={(event) => handleChange(event)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email" onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password" onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword" onChange={(event) => handleChange(event)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Register