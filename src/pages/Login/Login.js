import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, loginWithGoogle, loginWithFaceBook } from 'actions/ApiCall/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '../../assets/logo.svg'
import { GOOGLE_CLIENT_ID, FACEBOOK_CLIENT_ID } from 'utillities/constants'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

import './Login.scss'

function Login() {
  const navigate = useNavigate()
  const [values, setValue] = useState({
    username: '',
    password: ''
  })

  const [accessToken, secretAccessToken] = useState('')

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  }

  useEffect(() => {
    if (localStorage.getItem('trello-user')) {
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
          localStorage.setItem('trello-user', JSON.stringify(data.user))
          navigate('/')
        }
      })
    }
  }

  const loginFacebook = async (response) => {
    console.log(response)
    loginWithFaceBook({ access_token: response })
  }

  const loginGoogle = async (response) => {
    console.log('hwllo')
    console.log(response)
    if (response.accessToken) {
      console.log(response.accessToken)
      loginWithGoogle({ access_token: response.accessToken })
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
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText='Login'
          onSuccess={loginGoogle}
          onFailure={console.log('Login failed')}
          cookiePolicy={'single_host_origin'}
          responseType='code,token'
        />
        <FacebookLogin
          appId={FACEBOOK_CLIENT_ID}
          fields="name,email,picture"
          callback={loginFacebook}
        />
      </div>
      <ToastContainer />
    </>
  )
}

export default Login