import React, { useState, useContext, useEffect } from 'react'
import { Sms, Key, Eye, EyeSlash, ArrowCircleRight } from 'iconsax-react'
import BounceLoader from 'react-spinners/BounceLoader'
import { css } from '@emotion/react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import './login.scss'
import { EmailContext } from '../../context/emailContext/EmailContext'
import { loginAdmin } from '../../context/emailContext/apiCalls'

const override = css`
  display: block;
`

const Login = () => {
  const [showPass, setShowPass] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [password, setPassword] = useState('')

  const { isFetching, emailDispatch } = useContext(EmailContext)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (userEmail !== '' && password !== '') {
      loginAdmin(userEmail, password, navigate, emailDispatch)
    } else {
      toast.error('Please complete all fields!')
    }
  }

  // useEffect(() => {
  //     if (user !== null) {
  //         navigate('/');
  //     }
  // }, [user]);

  return (
    <div className="login">
      <div className="loginContain">
        <div className="loginLeft">
          <span className="mainTitle">Login</span>

          <div className="inputContain">
            <Sms color="#fff" className="loginIcon" size={40} />
            <input
              className="loginInput"
              placeholder="Enter yout email"
              type={'email'}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="inputContain">
            <Key color="#fff" className="loginIcon" size={40} />
            <input
              className="loginInput"
              placeholder="Enter yout password"
              type={showPass ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="showPass" onClick={() => setShowPass(!showPass)}>
              {!showPass ? (
                <EyeSlash color="#fff" className="loginIcon" />
              ) : (
                <Eye color="#fff" className="loginIcon" />
              )}
            </div>
          </div>

          <button className="btn" disabled={isFetching} onClick={handleLogin}>
            {/* <Link to="/dashboard" className="link"> */}
            {!isFetching ? (
              <div className="innerBtn">
                Login
                <ArrowCircleRight
                  color="#fff"
                  size={20}
                  variant="Bold"
                  style={{ marginLeft: '5px' }}
                />
              </div>
            ) : (
              <BounceLoader
                color={'#fff'}
                loading={true}
                css={override}
                size={15}
              />
            )}
            {/* </Link> */}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
